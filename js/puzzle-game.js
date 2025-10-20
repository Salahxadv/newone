// Puzzle Game for NEUKO Modal
// Simplified version to fix black screen issue

class PuzzleGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Puzzle container not found');
            return;
        }
        
        // Set up the puzzle
        this.setupPuzzle();
        this.initialized = true;
    }
    
    setupPuzzle() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create the puzzle element
        const puzzleElement = document.createElement('div');
        puzzleElement.id = 'fifteen';
        puzzleElement.style.width = '400px';
        puzzleElement.style.height = '500px';
        puzzleElement.style.position = 'relative';
        puzzleElement.style.margin = '0 auto';
        puzzleElement.style.background = '#000000';
        puzzleElement.style.border = '2px solid #444';
        puzzleElement.style.borderRadius = '8px';
        
        this.container.appendChild(puzzleElement);
        
        // Set up the puzzle configuration
        window.setup = {
            puzzle_fifteen: {
                diff: 200,
                size: [400, 500],
                grid: [3, 4],
                fill: false,
                number: false,
                art: {
                    url: "images/p1.png",
                    ratio: false
                },
                keyBoard: true,
                gamePad: false,
                time: 0.1,
                style: "background-color:#2a2a2a;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:8px;font-size:24px;border:2px solid #444;"
            }
        };
        
        // Initialize the puzzle
        this.initializePuzzle();
    }
    
    initializePuzzle() {
        // Wait a bit for the DOM to be ready
        setTimeout(() => {
            try {
                // Set up global variables
                window.p = window.setup.puzzle_fifteen;
                window.freeslot = [];
                window.size = [];
                window.m = [];
                window.o = 0;
                window.f = document.getElementById('fifteen');
                
                // Call the puzzle creation function
                if (typeof window.ceation_slots === 'function') {
                    window.ceation_slots();
                } else {
                    console.log('Puzzle function not ready, retrying...');
                    setTimeout(() => this.initializePuzzle(), 200);
                }
            } catch (error) {
                console.error('Error initializing puzzle:', error);
                setTimeout(() => this.initializePuzzle(), 500);
            }
        }, 100);
    }
    
    resize() {
        if (this.initialized) {
            this.setupPuzzle();
        }
    }
}

// Initialize puzzle game when modal opens
function initPuzzleGame() {
    if (document.getElementById('fifteen-puzzle')) {
        window.puzzleGame = new PuzzleGame('fifteen-puzzle');
        
        // Add resize listener
        window.addEventListener('resize', () => {
            if (window.puzzleGame) {
                window.puzzleGame.resize();
            }
        });
    }
}
