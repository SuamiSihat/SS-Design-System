// SS Health Defender Game
class SSHealthDefender {
  constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      
      // Game state
      this.gameRunning = false;
      this.score = 0;
      this.lives = 3;
      this.level = 1;
      this.gameStarted = false;
      
      // Player (SS Health)
      this.player = {
          x: this.canvas.width / 2,
          y: this.canvas.height - 80,
          width: 60,
          height: 60,
          speed: 6,
          color: '#6dc6ec'
      };
      
      // Load SS Health icon
      this.playerIcon = new Image();
      this.playerIcon.src = '../public/brand/logos/ss-logomark-dark.svg';
      
      // Bullets
      this.bullets = [];
      this.bulletSpeed = 8;
      
      // Enemies (Men's Health Threats)
      this.enemies = [];
      this.enemySpeed = 2;
      this.enemyDirection = 1;
      this.enemyDrop = 30;
      
      // Enemy bullets
      this.enemyBullets = [];
      
             // Enemy types with FontAwesome icons
       this.enemyTypes = [
           { name: 'porn', icon: 'fa-exclamation-triangle', color: '#ff6b6b' },
           { name: 'drugs', icon: 'fa-pills', color: '#ff8c00' },
           { name: 'alcohol', icon: 'fa-wine-bottle', color: '#ffd700' },
           { name: 'smoking', icon: 'fa-smoking', color: '#8b4513' },
           { name: 'gambling', icon: 'fa-dice', color: '#ff1493' }
       ];
      
      // Colors from SS theme
      this.colors = {
          player: '#6dc6ec',
          bullet: '#21a1f7',
          enemyBullet: '#ff6b6b',
          background: '#000033'
      };
      
      this.init();
  }
  
  resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
  }
  
  init() {
      this.createEnemies();
      this.bindEvents();
      this.updateStats();
      this.draw();
  }
  
  createEnemies() {
      this.enemies = [];
      const rows = 4;
      const cols = 8;
      const spacing = 80;
      
      for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
              const enemyType = this.enemyTypes[row % this.enemyTypes.length];
              this.enemies.push({
                  x: col * spacing + 100,
                  y: row * spacing + 100,
                  width: 50,
                  height: 50,
                  alive: true,
                  type: enemyType,
                  health: 1
              });
          }
      }
  }
  
  bindEvents() {
      window.addEventListener('resize', () => this.resizeCanvas());
      
      document.addEventListener('keydown', (e) => {
          if (!this.gameRunning) return;
          
          switch(e.key) {
              case 'ArrowLeft':
                  this.movePlayer(-1);
                  break;
              case 'ArrowRight':
                  this.movePlayer(1);
                  break;
              case ' ':
                  this.shoot();
                  e.preventDefault();
                  break;
          }
      });
  }
  
  movePlayer(direction) {
      this.player.x += direction * this.player.speed;
      this.player.x = Math.max(0, Math.min(this.width - this.player.width, this.player.x));
  }
  
  shoot() {
      this.bullets.push({
          x: this.player.x + this.player.width / 2 - 3,
          y: this.player.y,
          width: 6,
          height: 15,
          color: this.colors.bullet
      });
  }
  
  updateBullets() {
      // Update player bullets
      this.bullets = this.bullets.filter(bullet => {
          bullet.y -= this.bulletSpeed;
          return bullet.y > 0;
      });
      
      // Update enemy bullets
      this.enemyBullets = this.enemyBullets.filter(bullet => {
          bullet.y += bullet.speed;
          return bullet.y < this.height;
      });
      
      // Random enemy shooting
      if (Math.random() < 0.015 && this.enemies.length > 0) {
          const aliveEnemies = this.enemies.filter(e => e.alive);
          if (aliveEnemies.length > 0) {
              const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
              this.enemyBullets.push({
                  x: shooter.x + shooter.width / 2 - 2,
                  y: shooter.y + shooter.height,
                  width: 4,
                  height: 10,
                  speed: 4,
                  color: this.colors.enemyBullet
              });
          }
      }
  }
  
  updateEnemies() {
      let shouldDrop = false;
      
      this.enemies.forEach(enemy => {
          if (!enemy.alive) return;
          
          enemy.x += this.enemySpeed * this.enemyDirection;
          
          if (enemy.x <= 0 || enemy.x + enemy.width >= this.width) {
              shouldDrop = true;
          }
      });
      
      if (shouldDrop) {
          this.enemyDirection *= -1;
          this.enemies.forEach(enemy => {
              if (enemy.alive) {
                  enemy.y += this.enemyDrop;
              }
          });
      }
  }
  
  checkCollisions() {
      // Bullet vs Enemy
      this.bullets.forEach((bullet, bulletIndex) => {
          this.enemies.forEach((enemy, enemyIndex) => {
              if (!enemy.alive) return;
              
              if (this.collision(bullet, enemy)) {
                  enemy.health--;
                  if (enemy.health <= 0) {
                      enemy.alive = false;
                      this.score += 20;
                      this.updateStats();
                  }
                  this.bullets.splice(bulletIndex, 1);
              }
          });
      });
      
      // Enemy bullet vs Player
      this.enemyBullets.forEach((bullet, index) => {
          if (this.collision(bullet, this.player)) {
              this.enemyBullets.splice(index, 1);
              this.lives--;
              this.updateStats();
              
              if (this.lives <= 0) {
                  this.gameOver();
              }
          }
      });
      
      // Enemy vs Player
      this.enemies.forEach(enemy => {
          if (enemy.alive && this.collision(enemy, this.player)) {
              this.gameOver();
          }
      });
  }
  
  collision(rect1, rect2) {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
  }
  
  gameOver() {
      this.gameRunning = false;
      alert(`Game Over! Final Score: ${this.score}\n\nSS Health defended against ${Math.floor(this.score/20)} threats!`);
      this.reset();
  }
  
  updateStats() {
      document.getElementById('score').textContent = this.score;
      document.getElementById('level').textContent = this.level;
      
      // Update lives display
      const livesContainer = document.getElementById('lives');
      livesContainer.innerHTML = '';
      for (let i = 0; i < this.lives; i++) {
          const heart = document.createElement('div');
          heart.className = 'life-heart';
          livesContainer.appendChild(heart);
      }
  }
  
  draw() {
      // Clear canvas
      this.ctx.fillStyle = this.colors.background;
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      // Draw stars background
      this.drawStars();
      
      // Draw player (SS Health icon)
      this.drawPlayer();
      
      // Draw bullets
      this.bullets.forEach(bullet => this.drawRect(bullet));
      this.enemyBullets.forEach(bullet => this.drawRect(bullet));
      
      // Draw enemies
      this.enemies.forEach(enemy => {
          if (enemy.alive) {
              this.drawEnemy(enemy);
          }
      });
  }
  
     drawRect(obj) {
       // Add glow effect to bullets
       this.ctx.shadowColor = obj.color;
       this.ctx.shadowBlur = 8;
       this.ctx.fillStyle = obj.color;
       this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
       this.ctx.shadowBlur = 0;
   }
   
   // Utility functions for color manipulation
   darkenColor(color, amount) {
       const num = parseInt(color.replace("#", ""), 16);
       const amt = Math.round(2.55 * amount * 100);
       const R = (num >> 16) - amt;
       const G = (num >> 8 & 0x00FF) - amt;
       const B = (num & 0x0000FF) - amt;
       return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
           (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
           (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
   }
   
   lightenColor(color, amount) {
       const num = parseInt(color.replace("#", ""), 16);
       const amt = Math.round(2.55 * amount * 100);
       const R = (num >> 16) + amt;
       const G = (num >> 8 & 0x00FF) + amt;
       const B = (num & 0x0000FF) + amt;
       return "#" + (0x1000000 + (R > 255 ? 255 : R) * 0x10000 +
           (G > 255 ? 255 : G) * 0x100 +
           (B > 255 ? 255 : B)).toString(16).slice(1);
   }
  
     drawPlayer() {
       // Draw SS Health icon if game is running and icon is loaded
       if (this.gameRunning && this.playerIcon.complete && this.playerIcon.naturalWidth > 0) {
           // Add shadow for depth
           this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
           this.ctx.shadowBlur = 5;
           this.ctx.shadowOffsetX = 2;
           this.ctx.shadowOffsetY = 2;
           
           this.ctx.drawImage(
               this.playerIcon,
               this.player.x + 5,
               this.player.y + 5,
               this.player.width - 10,
               this.player.height - 10
           );
           
           this.ctx.shadowBlur = 0;
           this.ctx.shadowOffsetX = 0;
           this.ctx.shadowOffsetY = 0;
       } else {
           // Show SS text when game is not running
           this.ctx.fillStyle = '#fff';
           this.ctx.font = 'bold 20px Poppins';
           this.ctx.textAlign = 'center';
           this.ctx.fillText('Ready?', this.player.x + this.player.width/2, this.player.y + this.player.height/2 + 5);
       }
   }
  
        drawEnemy(enemy) {
       // Draw colorful FontAwesome-style icon without background
       this.drawFontAwesomeIcon(enemy.type.icon, enemy.x + enemy.width/2, enemy.y + enemy.height/2, 24);
   }
   
       drawFontAwesomeIcon(iconName, x, y, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        
        // Add shadow effect
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        
        switch(iconName) {
            case 'fa-exclamation-triangle':
                this.drawTriangle(size);
                break;
            case 'fa-pills':
                this.drawPills(size);
                break;
            case 'fa-wine-bottle':
                this.drawWineBottle(size);
                break;
            case 'fa-smoking':
                this.drawSmoking(size);
                break;
            case 'fa-dice':
                this.drawDice(size);
                break;
            default:
                // Fallback to simple shape
                this.ctx.fillRect(-size/2, -size/2, size, size);
        }
        
        this.ctx.restore();
    }
   
       drawTriangle(size) {
        // Draw gradient triangle
        const gradient = this.ctx.createLinearGradient(0, -size/2, 0, size/2);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#ff4757');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size/2);
        this.ctx.lineTo(-size/2, size/2);
        this.ctx.lineTo(size/2, size/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Add exclamation mark with glow
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 3;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(-2, -size/4, 4, size/3);
        this.ctx.fillRect(-2, size/6, 4, 4);
        this.ctx.shadowBlur = 0;
    }
   
       drawPills(size) {
        // Draw gradient pill shape
        const gradient = this.ctx.createLinearGradient(-size/2, 0, size/2, 0);
        gradient.addColorStop(0, '#ff8c00');
        gradient.addColorStop(0.5, '#ffa500');
        gradient.addColorStop(1, '#ff8c00');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.ellipse(-size/4, 0, size/4, size/6, 0, 0, 2 * Math.PI);
        this.ctx.ellipse(size/4, 0, size/4, size/6, 0, 0, 2 * Math.PI);
        this.ctx.rect(-size/4, -size/6, size/2, size/3);
        this.ctx.fill();
        
        // Add pill details with glow
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 2;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(-size/6, -size/8, size/3, size/4);
        this.ctx.shadowBlur = 0;
    }
   
       drawWineBottle(size) {
        // Draw gradient bottle shape
        const gradient = this.ctx.createLinearGradient(0, -size/2, 0, size/2);
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.5, '#ffed4e');
        gradient.addColorStop(1, '#ffd700');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.rect(-size/3, -size/2, size/1.5, size/2);
        this.ctx.ellipse(0, -size/2, size/4, size/6, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add bottle details with glow
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 2;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(-size/4, -size/3, size/2, size/6);
        this.ctx.shadowBlur = 0;
    }
   
       drawSmoking(size) {
        // Draw cigarette with gradient
        const gradient = this.ctx.createLinearGradient(-size/2, 0, size/2, 0);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.2, '#fff');
        gradient.addColorStop(1, '#fff');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-size/2, -size/6, size, size/3);
        
        // Add animated smoke
        const smokeOffset = Math.sin(Date.now() * 0.003) * 2;
        this.ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(size/2 + smokeOffset, -size/6, size/6, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 3;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(size/2 + smokeOffset, -size/6, size/8, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
   
       drawDice(size) {
        // Draw gradient dice cube
        const gradient = this.ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
        gradient.addColorStop(0, '#ff1493');
        gradient.addColorStop(0.5, '#ff69b4');
        gradient.addColorStop(1, '#ff1493');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-size/2, -size/2, size, size);
        
        // Add border
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(-size/2, -size/2, size, size);
        
        // Add animated dice dots
        const dotOffset = Math.sin(Date.now() * 0.002) * 0.5;
        this.ctx.fillStyle = '#fff';
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 2;
        this.ctx.beginPath();
        this.ctx.arc(-size/4 + dotOffset, -size/4 + dotOffset, 3, 0, 2 * Math.PI);
        this.ctx.arc(size/4 + dotOffset, size/4 + dotOffset, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
  
     drawStars() {
       this.ctx.fillStyle = '#fff';
       for (let i = 0; i < 100; i++) {
           const x = (i * 37) % this.width;
           const y = (i * 73) % this.height;
           
           // Add twinkling effect
           const twinkle = Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5;
           this.ctx.globalAlpha = twinkle;
           
           // Vary star sizes
           const size = (i % 3) + 1;
           this.ctx.fillRect(x, y, size, size);
           
           // Add some colored stars
           if (i % 10 === 0) {
               this.ctx.fillStyle = '#6dc6ec';
               this.ctx.fillRect(x, y, size, size);
               this.ctx.fillStyle = '#fff';
           }
       }
       this.ctx.globalAlpha = 1;
   }
  
  gameLoop() {
      if (!this.gameRunning) return;
      
      this.updateBullets();
      this.updateEnemies();
      this.checkCollisions();
      this.draw();
      
      requestAnimationFrame(() => this.gameLoop());
  }
  
  start() {
      this.gameRunning = true;
      this.gameStarted = true;
      this.gameLoop();
  }
  
  reset() {
      this.score = 0;
      this.lives = 3;
      this.level = 1;
      this.bullets = [];
      this.enemyBullets = [];
      this.createEnemies();
      this.updateStats();
      this.gameRunning = false;
      this.draw();
  }
}

// Initialize game
let game;

function initGame() {
  game = new SSHealthDefender();
}

function startGame() {
  if (!game) initGame();
  game.start();
}

function resetGame() {
  if (game) game.reset();
}

function hideInstructions() {
  document.getElementById('instructions').style.display = 'none';
  startGame();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initGame);
