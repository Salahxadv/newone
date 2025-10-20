// Snake Game for NEUKO Modal
// Modified version of the original snake game to work in the modal

// Snake Game Class
class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        
        // Game settings
        this.tileSize = 32; // Smaller tiles for modal
        this.columns = 16;
        this.rows = 12;
        
        // Timing
        this.lastFrame = 0;
        this.fpsTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        
        // Game state
        this.initialized = false;
        this.score = 0;
        this.gameOver = true;
        this.gameOverTime = 1;
        this.gameOverDelay = 0.5;
        
        // Images
        this.images = [];
        this.tileImage = null;
        this.appleImage = null;
        this.titleImage = null;
        this.loadCount = 0;
        this.loadTotal = 0;
        this.preloaded = false;
        
        // Game objects
        this.snake = null;
        this.level = null;
        
        this.init();
    }
    
    // Resize canvas to fill the modal
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerRect = container.getBoundingClientRect();
        
        // Calculate available space (subtract some padding)
        const availableWidth = containerRect.width - 20;
        const availableHeight = containerRect.height - 20;
        
        // Calculate tile size to fit the available space
        const maxTileWidth = Math.floor(availableWidth / this.columns);
        const maxTileHeight = Math.floor(availableHeight / this.rows);
        this.tileSize = Math.min(maxTileWidth, maxTileHeight, 64); // Max 64px per tile
        
        // Set canvas size
        this.canvas.width = this.columns * this.tileSize;
        this.canvas.height = this.rows * this.tileSize;
        
        // Update level tile sizes
        if (this.level) {
            this.level.tileWidth = this.tileSize;
            this.level.tileHeight = this.tileSize;
        }
    }
    
    // Load images
    loadImages() {
        this.loadCount = 0;
        this.loadTotal = 3; // snake-graphics.png, 2.png, 3.jpg
        this.preloaded = false;
        
        // Load snake graphics
        this.tileImage = new Image();
        this.tileImage.onload = () => {
            this.loadCount++;
            if (this.loadCount === this.loadTotal) {
                this.preloaded = true;
            }
        };
        this.tileImage.src = "images/snake-graphics.png";
        
        // Load apple image
        this.appleImage = new Image();
        this.appleImage.onload = () => {
            this.loadCount++;
            if (this.loadCount === this.loadTotal) {
                this.preloaded = true;
            }
        };
        this.appleImage.src = "images/3.jpg";
        
        // Load title image
        this.titleImage = new Image();
        this.titleImage.onload = () => {
            this.loadCount++;
            if (this.loadCount === this.loadTotal) {
                this.preloaded = true;
            }
        };
        this.titleImage.src = "images/2.png";
    }
    
    // Initialize the game
    init() {
        this.loadImages();
        
        // Set canvas size to fill the modal
        this.resizeCanvas();
        
        // Add resize listener
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create game objects
        this.snake = new Snake();
        this.level = new Level(this.columns, this.rows, this.tileSize, this.tileSize);
        
        // Add event listeners
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        
        // Start the game
        this.newGame();
        this.gameOver = true;
        
        // Start main loop
        this.main(0);
    }
    
    // New game
    newGame() {
        this.snake.init(Math.floor(this.columns/2), Math.floor(this.rows/2), 1, 8, 3);
        this.level.generate();
        this.addApple();
        this.score = 0;
        this.gameOver = false;
    }
    
    // Add apple to level
    addApple() {
        let valid = false;
        while (!valid) {
            const ax = this.randRange(0, this.columns - 1);
            const ay = this.randRange(0, this.rows - 1);
            
            let overlap = false;
            for (let i = 0; i < this.snake.segments.length; i++) {
                const sx = this.snake.segments[i].x;
                const sy = this.snake.segments[i].y;
                
                if (ax === sx && ay === sy) {
                    overlap = true;
                    break;
                }
            }
            
            if (!overlap && this.level.tiles[ax][ay] === 0) {
                this.level.tiles[ax][ay] = 2;
                valid = true;
            }
        }
    }
    
    // Main game loop
    main(tframe) {
        requestAnimationFrame((t) => this.main(t));
        
        if (!this.initialized) {
            // Loading screen
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            const loadPercentage = this.loadCount / this.loadTotal;
            this.context.strokeStyle = "#ff8080";
            this.context.lineWidth = 2;
            this.context.strokeRect(10, this.canvas.height - 30, this.canvas.width - 20, 20);
            this.context.fillStyle = "#ff8080";
            this.context.fillRect(10, this.canvas.height - 30, loadPercentage * (this.canvas.width - 20), 20);
            
            this.context.fillStyle = "#000000";
            this.context.font = "12px Verdana";
            this.context.fillText(`Loading ${this.loadCount}/${this.loadTotal}`, 10, this.canvas.height - 35);
            
            if (this.preloaded) {
                this.initialized = true;
            }
        } else {
            this.update(tframe);
            this.render();
        }
    }
    
    // Update game state
    update(tframe) {
        const dt = (tframe - this.lastFrame) / 1000;
        this.lastFrame = tframe;
        
        this.updateFps(dt);
        
        if (!this.gameOver) {
            this.updateGame(dt);
        } else {
            this.gameOverTime += dt;
        }
    }
    
    // Update game logic
    updateGame(dt) {
        if (this.snake.tryMove(dt)) {
            const nextMove = this.snake.nextMove();
            const nx = nextMove.x;
            const ny = nextMove.y;
            
            if (nx >= 0 && nx < this.columns && ny >= 0 && ny < this.rows) {
                if (this.level.tiles[nx][ny] === 1) {
                    this.gameOver = true;
                }
                
                // Check snake collision with itself
                for (let i = 0; i < this.snake.segments.length; i++) {
                    const sx = this.snake.segments[i].x;
                    const sy = this.snake.segments[i].y;
                    
                    if (nx === sx && ny === sy) {
                        this.gameOver = true;
                        break;
                    }
                }
                
                if (!this.gameOver) {
                    this.snake.move();
                    
                    if (this.level.tiles[nx][ny] === 2) {
                        this.level.tiles[nx][ny] = 0;
                        this.addApple();
                        this.snake.grow();
                        this.score++;
                    }
                }
            } else {
                this.gameOver = true;
            }
            
            if (this.gameOver) {
                this.gameOverTime = 0;
            }
        }
    }
    
    // Update FPS counter
    updateFps(dt) {
        if (this.fpsTime > 0.25) {
            this.fps = Math.round(this.frameCount / this.fpsTime);
            this.fpsTime = 0;
            this.frameCount = 0;
        }
        
        this.fpsTime += dt;
        this.frameCount++;
    }
    
    // Render the game
    render() {
        // Clear canvas
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw score
        this.context.fillStyle = "#ffffff";
        this.context.font = "bold 16px Verdana";
        this.context.fillText(`Score: ${this.score}`, 10, this.canvas.height - 10);
        
        // Draw game area
        this.drawLevel();
        this.drawSnake();
        
        // Game over screen
        if (this.gameOver) {
            this.context.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.context.fillStyle = "#ffffff";
            this.context.font = "bold 18px Verdana";
            this.drawCenterText("Press any key to start!", 0, this.canvas.height/2, this.canvas.width);
        }
    }
    
    // Draw level tiles
    drawLevel() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                const tile = this.level.tiles[i][j];
                const tileX = i * this.tileSize;
                const tileY = j * this.tileSize;
                
                if (tile === 0) {
                    this.context.fillStyle = "#f7e697";
                    this.context.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                } else if (tile === 1) {
                    this.context.fillStyle = "#bcae76";
                    this.context.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                } else if (tile === 2) {
                    this.context.fillStyle = "#f7e697";
                    this.context.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                    
                    if (this.appleImage) {
                        this.context.drawImage(this.appleImage, tileX, tileY, this.tileSize, this.tileSize);
                    }
                }
            }
        }
    }
    
    // Draw snake
    drawSnake() {
        for (let i = 0; i < this.snake.segments.length; i++) {
            const segment = this.snake.segments[i];
            const segX = segment.x;
            const segY = segment.y;
            const tileX = segX * this.tileSize;
            const tileY = segY * this.tileSize;
            
            let tx = 0;
            let ty = 0;
            
            if (i === 0) {
                // Head
                const nextSeg = this.snake.segments[i + 1];
                if (segY < nextSeg.y) {
                    tx = 3; ty = 0;
                } else if (segX > nextSeg.x) {
                    tx = 4; ty = 0;
                } else if (segY > nextSeg.y) {
                    tx = 4; ty = 1;
                } else if (segX < nextSeg.x) {
                    tx = 3; ty = 1;
                }
            } else if (i === this.snake.segments.length - 1) {
                // Tail
                const prevSeg = this.snake.segments[i - 1];
                if (prevSeg.y < segY) {
                    tx = 3; ty = 2;
                } else if (prevSeg.x > segX) {
                    tx = 4; ty = 2;
                } else if (prevSeg.y > segY) {
                    tx = 4; ty = 3;
                } else if (prevSeg.x < segX) {
                    tx = 3; ty = 3;
                }
            } else {
                // Body
                const prevSeg = this.snake.segments[i - 1];
                const nextSeg = this.snake.segments[i + 1];
                if (prevSeg.x < segX && nextSeg.x > segX || nextSeg.x < segX && prevSeg.x > segX) {
                    tx = 1; ty = 0;
                } else if (prevSeg.x < segX && nextSeg.y > segY || nextSeg.x < segX && prevSeg.y > segY) {
                    tx = 2; ty = 0;
                } else if (prevSeg.y < segY && nextSeg.y > segY || nextSeg.y < segY && prevSeg.y > segY) {
                    tx = 2; ty = 1;
                } else if (prevSeg.y < segY && nextSeg.x < segX || nextSeg.y < segY && prevSeg.x < segX) {
                    tx = 2; ty = 2;
                } else if (prevSeg.x > segX && nextSeg.y < segY || nextSeg.x > segX && prevSeg.y < segY) {
                    tx = 0; ty = 1;
                } else if (prevSeg.y > segY && nextSeg.x > segX || nextSeg.y > segY && prevSeg.x > segX) {
                    tx = 0; ty = 0;
                }
            }
            
            if (this.tileImage) {
                this.context.drawImage(this.tileImage, tx * 64, ty * 64, 64, 64, 
                    tileX, tileY, this.tileSize, this.tileSize);
            }
        }
    }
    
    // Draw centered text
    drawCenterText(text, x, y, width) {
        const textDim = this.context.measureText(text);
        this.context.fillText(text, x + (width - textDim.width) / 2, y);
    }
    
    // Random range
    randRange(low, high) {
        return Math.floor(low + Math.random() * (high - low + 1));
    }
    
    // Try new game
    tryNewGame() {
        if (this.gameOverTime > this.gameOverDelay) {
            this.newGame();
            this.gameOver = false;
        }
    }
    
    // Mouse event
    onMouseDown(e) {
        if (this.gameOver) {
            this.tryNewGame();
        } else {
            this.snake.direction = (this.snake.direction + 1) % this.snake.directions.length;
        }
    }
    
    // Keyboard event
    onKeyDown(e) {
        if (this.gameOver) {
            this.tryNewGame();
        } else {
            if (e.keyCode === 37 || e.keyCode === 65) { // Left or A
                if (this.snake.direction !== 1) {
                    this.snake.direction = 3;
                }
            } else if (e.keyCode === 38 || e.keyCode === 87) { // Up or W
                if (this.snake.direction !== 2) {
                    this.snake.direction = 0;
                }
            } else if (e.keyCode === 39 || e.keyCode === 68) { // Right or D
                if (this.snake.direction !== 3) {
                    this.snake.direction = 1;
                }
            } else if (e.keyCode === 40 || e.keyCode === 83) { // Down or S
                if (this.snake.direction !== 0) {
                    this.snake.direction = 2;
                }
            }
        }
    }
}

// Snake class
class Snake {
    constructor() {
        this.init(0, 0, 1, 8, 3);
    }
    
    get directions() {
        return [[0, -1], [1, 0], [0, 1], [-1, 0]];
    }
    
    init(x, y, direction, speed, numSegments) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.moveDelay = 0;
        
        this.segments = [];
        this.growSegments = 0;
        for (let i = 0; i < numSegments; i++) {
            this.segments.push({
                x: this.x - i * this.directions[direction][0],
                y: this.y - i * this.directions[direction][1]
            });
        }
    }
    
    grow() {
        this.growSegments++;
    }
    
    tryMove(dt) {
        this.moveDelay += dt;
        const maxMoveDelay = 1 / this.speed;
        if (this.moveDelay > maxMoveDelay) {
            return true;
        }
        return false;
    }
    
    nextMove() {
        const nextX = this.x + this.directions[this.direction][0];
        const nextY = this.y + this.directions[this.direction][1];
        return { x: nextX, y: nextY };
    }
    
    move() {
        const nextMove = this.nextMove();
        this.x = nextMove.x;
        this.y = nextMove.y;
        
        const lastSeg = this.segments[this.segments.length - 1];
        const growX = lastSeg.x;
        const growY = lastSeg.y;
        
        for (let i = this.segments.length - 1; i >= 1; i--) {
            this.segments[i].x = this.segments[i - 1].x;
            this.segments[i].y = this.segments[i - 1].y;
        }
        
        if (this.growSegments > 0) {
            this.segments.push({ x: growX, y: growY });
            this.growSegments--;
        }
        
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;
        
        this.moveDelay = 0;
    }
}

// Level class
class Level {
    constructor(columns, rows, tileWidth, tileHeight) {
        this.columns = columns;
        this.rows = rows;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        
        this.tiles = [];
        for (let i = 0; i < this.columns; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.tiles[i][j] = 0;
            }
        }
    }
    
    generate() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i === 0 || i === this.columns - 1 || j === 0 || j === this.rows - 1) {
                    this.tiles[i][j] = 1; // Wall
                } else {
                    this.tiles[i][j] = 0; // Empty
                }
            }
        }
    }
}

// Initialize snake game when modal opens
function initSnakeGame() {
    if (document.getElementById('snake-canvas')) {
        window.snakeGame = new SnakeGame('snake-canvas');
    }
}
