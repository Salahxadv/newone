class MemeGenerator {
    constructor() {
        this.currentTextElement = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.templates = [];
        this.currentTemplate = 'cat-meme.jpg';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTemplates();
        this.selectTextElement('top');
    }

    setupEventListeners() {
        // Text selection buttons
        document.querySelectorAll('.text-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const textType = e.target.dataset.text;
                this.selectTextElement(textType);
            });
        });

        // Control panel inputs
        document.getElementById('textContent').addEventListener('input', (e) => {
            this.updateTextContent(e.target.value);
        });

        document.getElementById('fontSelect').addEventListener('change', (e) => {
            this.updateFont(e.target.value);
        });

        document.getElementById('strokeColor').addEventListener('change', (e) => {
            this.updateStrokeColor(e.target.value);
        });

        document.getElementById('strokeWidth').addEventListener('input', (e) => {
            this.updateStrokeWidth(e.target.value);
        });

        document.getElementById('sizeX').addEventListener('input', (e) => {
            this.updateSize('x', e.target.value);
        });

        document.getElementById('sizeY').addEventListener('input', (e) => {
            this.updateSize('y', e.target.value);
        });

        document.getElementById('posX').addEventListener('input', (e) => {
            this.updatePosition('x', e.target.value);
        });

        document.getElementById('posY').addEventListener('input', (e) => {
            this.updatePosition('y', e.target.value);
        });

        document.getElementById('rotation').addEventListener('input', (e) => {
            this.updateRotation(e.target.value);
        });

        document.getElementById('textColor').addEventListener('change', (e) => {
            this.updateTextColor(e.target.value);
        });

        // Text overlay click events
        document.getElementById('topText').addEventListener('click', () => {
            this.selectTextElement('top');
        });

        document.getElementById('bottomText').addEventListener('click', () => {
            this.selectTextElement('bottom');
        });

        // Drag functionality
        this.setupDragAndDrop();

        // Action buttons
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveMeme();
        });

        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyMeme();
        });
    }

    selectTextElement(textType) {
        // Remove active class from all buttons
        document.querySelectorAll('.text-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        document.querySelector(`[data-text="${textType}"]`).classList.add('active');

        // Remove selected class from all text elements
        document.querySelectorAll('.text-overlay').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selected class to current text element
        this.currentTextElement = document.getElementById(`${textType}Text`);
        this.currentTextElement.classList.add('selected');

        // Update control panel with current text properties
        this.updateControlPanel();
    }

    updateControlPanel() {
        if (!this.currentTextElement) return;

        const computedStyle = window.getComputedStyle(this.currentTextElement);
        const transform = computedStyle.transform;
        
        // Extract values from transform matrix
        const matrix = transform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            const scaleX = parseFloat(values[0]);
            const scaleY = parseFloat(values[3]);
            
            document.getElementById('sizeX').value = scaleX.toFixed(1);
            document.getElementById('sizeY').value = scaleY.toFixed(1);
        }

        // Update text content
        const textContent = this.currentTextElement.textContent;
        document.getElementById('textContent').value = textContent;

        // Update position
        const rect = this.currentTextElement.getBoundingClientRect();
        const canvasRect = document.getElementById('memeCanvas').getBoundingClientRect();
        
        document.getElementById('posX').value = Math.round(rect.left - canvasRect.left + rect.width / 2);
        document.getElementById('posY').value = Math.round(rect.top - canvasRect.top);
    }

    updateTextContent(content) {
        if (this.currentTextElement) {
            this.currentTextElement.textContent = content;
        }
    }

    updateFont(font) {
        if (this.currentTextElement) {
            this.currentTextElement.style.fontFamily = font;
        }
    }

    updateStrokeColor(color) {
        if (this.currentTextElement) {
            const strokeWidth = document.getElementById('strokeWidth').value;
            this.currentTextElement.style.textShadow = 
                `${strokeWidth}px ${strokeWidth}px 0px ${color}, -${strokeWidth}px -${strokeWidth}px 0px ${color}, ${strokeWidth}px -${strokeWidth}px 0px ${color}, -${strokeWidth}px ${strokeWidth}px 0px ${color}`;
        }
    }

    updateStrokeWidth(width) {
        if (this.currentTextElement) {
            const strokeColor = document.getElementById('strokeColor').value;
            this.currentTextElement.style.textShadow = 
                `${width}px ${width}px 0px ${strokeColor}, -${width}px -${width}px 0px ${strokeColor}, ${width}px -${width}px 0px ${strokeColor}, -${width}px ${width}px 0px ${strokeColor}`;
        }
    }

    updateSize(axis, value) {
        if (this.currentTextElement) {
            const scaleX = axis === 'x' ? value : document.getElementById('sizeX').value;
            const scaleY = axis === 'y' ? value : document.getElementById('sizeY').value;
            this.currentTextElement.style.transform = `translateX(-50%) scale(${scaleX}, ${scaleY})`;
        }
    }

    updatePosition(axis, value) {
        if (this.currentTextElement) {
            if (axis === 'x') {
                this.currentTextElement.style.left = value + 'px';
            } else {
                this.currentTextElement.style.top = value + 'px';
            }
        }
    }

    updateRotation(angle) {
        if (this.currentTextElement) {
            const currentTransform = this.currentTextElement.style.transform;
            const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
            const scale = scaleMatch ? scaleMatch[1] : '1, 1';
            
            this.currentTextElement.style.transform = 
                `translateX(-50%) scale(${scale}) rotate(${angle}deg)`;
        }
    }

    updateTextColor(color) {
        if (this.currentTextElement) {
            this.currentTextElement.style.color = color;
        }
    }

    setupDragAndDrop() {
        document.querySelectorAll('.text-overlay').forEach(element => {
            element.addEventListener('mousedown', (e) => {
                if (e.target === element) {
                    this.isDragging = true;
                    element.classList.add('dragging');
                    
                    const rect = element.getBoundingClientRect();
                    this.dragOffset.x = e.clientX - rect.left;
                    this.dragOffset.y = e.clientY - rect.top;
                    
                    e.preventDefault();
                }
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging && this.currentTextElement) {
                const canvasRect = document.getElementById('memeCanvas').getBoundingClientRect();
                const x = e.clientX - canvasRect.left - this.dragOffset.x;
                const y = e.clientY - canvasRect.top - this.dragOffset.y;
                
                this.currentTextElement.style.left = x + 'px';
                this.currentTextElement.style.top = y + 'px';
                
                // Update position inputs
                document.getElementById('posX').value = Math.round(x);
                document.getElementById('posY').value = Math.round(y);
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                document.querySelectorAll('.text-overlay').forEach(el => {
                    el.classList.remove('dragging');
                });
            }
        });
    }

    loadTemplates() {
        // Default templates - you can add more images here
        this.templates = [
            { name: 'Cat Meme', src: 'images/cat-meme.jpg' },
            { name: 'Woman Red Dress', src: 'images/woman-red-dress.jpg' },
            { name: 'Children Field', src: 'images/children-field.jpg' },
            { name: 'Group Table', src: 'images/group-table.jpg' },
            { name: 'Abstract Pattern', src: 'images/abstract-pattern.jpg' },
            { name: 'Anime Character', src: 'images/anime-character.jpg' },
            { name: 'Animal Shape', src: 'images/animal-shape.jpg' },
            { name: 'Man Suit', src: 'images/man-suit.jpg' },
            { name: 'Yellow Pattern', src: 'images/yellow-pattern.jpg' },
            { name: 'Older Woman', src: 'images/older-woman.jpg' },
            { name: 'Black White Person', src: 'images/black-white-person.jpg' },
            { name: 'Green Pattern', src: 'images/green-pattern.jpg' }
        ];

        this.renderTemplates();
    }

    renderTemplates() {
        const templatesGrid = document.getElementById('templatesGrid');
        templatesGrid.innerHTML = '';

        this.templates.forEach((template, index) => {
            const thumb = document.createElement('img');
            thumb.src = template.src;
            thumb.alt = template.name;
            thumb.className = 'template-thumb';
            thumb.title = template.name;
            
            if (template.src.includes(this.currentTemplate)) {
                thumb.classList.add('active');
            }
            
            thumb.addEventListener('click', () => {
                this.changeTemplate(template.src);
                document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            
            templatesGrid.appendChild(thumb);
        });
    }

    changeTemplate(src) {
        document.getElementById('memeImage').src = src;
        this.currentTemplate = src.split('/').pop();
    }

    saveMeme() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const memeCanvas = document.getElementById('memeCanvas');
        const img = document.getElementById('memeImage');
        
        if (!img || !memeCanvas) return;
        
        const ensureLoaded = () => new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
            }
        });
        
        ensureLoaded().then(() => {
            const width = img.naturalWidth || img.width;
            const height = img.naturalHeight || img.height;
            if (!width || !height) return;
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            const topText = document.getElementById('topText');
            const bottomText = document.getElementById('bottomText');
            if (topText) this.drawTextOnCanvas(ctx, topText, width, height);
            if (bottomText) this.drawTextOnCanvas(ctx, bottomText, width, height);
            
            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'meme.png';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
            }, 'image/png');
        });
    }

    drawTextOnCanvas(ctx, textElement, canvasWidth, canvasHeight) {
        const rect = textElement.getBoundingClientRect();
        const canvasRect = document.getElementById('memeCanvas').getBoundingClientRect();
        
        const x = (rect.left - canvasRect.left) * (canvasWidth / canvasRect.width);
        const y = (rect.top - canvasRect.top) * (canvasHeight / canvasRect.height);
        
        const computedStyle = window.getComputedStyle(textElement);
        const fontSize = parseInt(computedStyle.fontSize) * (canvasWidth / canvasRect.width);
        
        ctx.font = `${fontSize}px ${computedStyle.fontFamily}`;
        ctx.fillStyle = computedStyle.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // Draw stroke
        const strokeWidth = parseInt(document.getElementById('strokeWidth').value);
        const strokeColor = document.getElementById('strokeColor').value;
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth * 2;
        ctx.strokeText(textElement.textContent, x, y);
        
        // Draw fill
        ctx.fillText(textElement.textContent, x, y);
    }

    copyMeme() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const memeCanvas = document.getElementById('memeCanvas');
        const img = document.getElementById('memeImage');
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Draw text overlays
        const topText = document.getElementById('topText');
        const bottomText = document.getElementById('bottomText');
        
        this.drawTextOnCanvas(ctx, topText, canvas.width, canvas.height);
        this.drawTextOnCanvas(ctx, bottomText, canvas.width, canvas.height);
        
        // Copy to clipboard
        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]).then(() => {
                alert('Meme copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy meme:', err);
                alert('Failed to copy meme. Try saving instead.');
            });
        });
    }
}

// Initialize the meme generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemeGenerator();
});
