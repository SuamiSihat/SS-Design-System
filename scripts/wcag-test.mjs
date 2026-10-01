import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

function getAllHtmlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const buildDir = path.join(process.cwd(), 'build');
const htmlFiles = getAllHtmlFiles(buildDir);

console.log(`Found ${htmlFiles.length} HTML files to test for WCAG...`);

async function runTests() {
  let hasErrors = false;
  let totalViolations = 0;
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const window = dom.window;
    
    // Inject axe into the global scope
    global.window = window;
    global.document = window.document;
    global.Node = window.Node;

    try {
      const results = await axe.run(window.document.documentElement, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        }
      });

      if (results.violations.length > 0) {
        console.log(`\n❌ ${file.replace(buildDir, '')} - ${results.violations.length} violations:`);
        results.violations.forEach(v => {
          console.log(`   - [${v.impact}] ${v.id}: ${v.description}`);
          v.nodes.forEach(n => {
            console.log(`     Element: ${n.html.substring(0, 80)}${n.html.length > 80 ? '...' : ''}`);
            console.log(`     Reason: ${n.failureSummary}`);
          });
          totalViolations++;
        });
        hasErrors = true;
      } else {
        console.log(`✅ ${file.replace(buildDir, '')} (Passed)`);
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
  
  if (hasErrors) {
    console.log(`\n❌ ${totalViolations} WCAG violations found across all files.`);
  } else {
    console.log('\n✅ All pages passed WCAG standards (A/AA)!');
  }
}

runTests();
