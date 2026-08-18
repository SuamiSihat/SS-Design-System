/**
 * SS Design System — File Watcher
 * Watches assets/css/ and assets/js/ and triggers minification on change.
 * 
 * Usage: npm run watch
 */

import chokidar from 'chokidar';
import { exec } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

console.log('👀 Watching SS-Design-System assets for changes...');

function runMinify(script, name) {
  console.log('⚡ Changes detected in ' + name + '. Rebuilding...');
  exec('node ' + join(__dirname, script), { cwd: ROOT }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error rebuilding ' + name + ':', stderr);
    } else {
      console.log(stdout.trim());
    }
  });
}

// Watch CSS files (exclude dist)
const cssWatcher = chokidar.watch(join(ROOT, 'assets/css/*.css'), {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true
});

cssWatcher.on('change', () => runMinify('minify-css.mjs', 'CSS'));

// Watch JS files (exclude dist)
const jsWatcher = chokidar.watch(join(ROOT, 'assets/js/*.js'), {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true
});

jsWatcher.on('change', () => runMinify('minify-js.mjs', 'JS'));
