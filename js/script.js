// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Dock item click handlers
document.addEventListener('DOMContentLoaded', function() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            console.log(`Clicked on ${appName}`);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // App-specific functionality
            if (appName === 'twitter') {
                // Open NEUKO X profile in new tab
                window.open('https://x.com/neukoai', '_blank');
            } else if (appName === 'soundcloud') {
                // Open SoundCloud modal
                const soundcloudModal = document.getElementById('soundcloud-modal');
                if (soundcloudModal) {
                    soundcloudModal.style.display = 'block';
                }
            } else if (appName === 'trash') {
                // Open Trash modal
                openTrashModal();
            } else if (appName === 'smile') {
                // Open Epic Smiles Gallery modal
                const epicSmilesModal = document.getElementById('epic-smiles-modal');
                if (epicSmilesModal) {
                    epicSmilesModal.style.display = 'block';
                }
            } else if (appName === 'pfp-generator') {
                // Open PFP Generator modal
                const pfpGeneratorModal = document.getElementById('pfp-generator-modal');
                if (pfpGeneratorModal) {
                    pfpGeneratorModal.style.display = 'block';
                    // Initialize PFP Generator
                    initPFPGenerator();
                }
            } else if (appName === 'firefox') {
                // Open NEUKO website
                window.open('https://www.neuko.ai/', '_blank');
            }
            // TODO: Add other app-specific functionality here
        });
    });
    
    // Apple logo click handler
    const appleLogo = document.querySelector('.apple-logo');
    if (appleLogo) {
        appleLogo.addEventListener('click', function() {
            console.log('Apple logo clicked');
            // TODO: Add Apple menu functionality
        });
    }
    
    
    // SoundCloud modal close handler
    const soundcloudClose = document.getElementById('soundcloud-close');
    if (soundcloudClose) {
        soundcloudClose.addEventListener('click', function() {
            const soundcloudModal = document.getElementById('soundcloud-modal');
            if (soundcloudModal) {
                soundcloudModal.style.display = 'none';
            }
        });
    }
    
    // SoundCloud modal minimize handler
    const soundcloudMinimize = document.querySelector('.soundcloud-minimize');
    if (soundcloudMinimize) {
        soundcloudMinimize.addEventListener('click', function() {
            const soundcloudModal = document.getElementById('soundcloud-modal');
            if (soundcloudModal) {
                soundcloudModal.style.display = 'none';
            }
        });
    }
    
    // SoundCloud modal maximize handler
    const soundcloudMaximize = document.querySelector('.soundcloud-maximize');
    if (soundcloudMaximize) {
        soundcloudMaximize.addEventListener('click', function() {
            const soundcloudModal = document.getElementById('soundcloud-modal');
            if (soundcloudModal) {
                soundcloudModal.classList.toggle('soundcloud-maximized');
            }
        });
    }
    
    // Close SoundCloud modal when clicking outside
    const soundcloudModal = document.getElementById('soundcloud-modal');
    if (soundcloudModal) {
        soundcloudModal.addEventListener('click', function(e) {
            if (e.target === soundcloudModal) {
                soundcloudModal.style.display = 'none';
            }
        });
    }
    
    // Make SoundCloud modal draggable
    makeSoundcloudDraggable();
    
    // Epic Smiles modal close handler
    const epicSmilesClose = document.getElementById('epic-smiles-close');
    if (epicSmilesClose) {
        epicSmilesClose.addEventListener('click', function() {
            const epicSmilesModal = document.getElementById('epic-smiles-modal');
            if (epicSmilesModal) {
                epicSmilesModal.style.display = 'none';
            }
        });
    }
    
    // Epic Smiles modal minimize handler
    const epicSmilesMinimize = document.querySelector('.epic-smiles-minimize');
    if (epicSmilesMinimize) {
        epicSmilesMinimize.addEventListener('click', function() {
            const epicSmilesModal = document.getElementById('epic-smiles-modal');
            if (epicSmilesModal) {
                epicSmilesModal.style.display = 'none';
            }
        });
    }
    
    // Epic Smiles modal maximize handler
    const epicSmilesMaximize = document.querySelector('.epic-smiles-maximize');
    if (epicSmilesMaximize) {
        epicSmilesMaximize.addEventListener('click', function() {
            const epicSmilesModal = document.getElementById('epic-smiles-modal');
            if (epicSmilesModal) {
                epicSmilesModal.classList.toggle('epic-smiles-maximized');
            }
        });
    }
    
    // Close Epic Smiles modal when clicking outside
    const epicSmilesModal = document.getElementById('epic-smiles-modal');
    if (epicSmilesModal) {
        epicSmilesModal.addEventListener('click', function(e) {
            if (e.target === epicSmilesModal) {
                epicSmilesModal.style.display = 'none';
            }
        });
    }
    
    // Image viewer modal close handler
    const imageViewerClose = document.getElementById('image-viewer-close');
    if (imageViewerClose) {
        imageViewerClose.addEventListener('click', function() {
            const imageViewerModal = document.getElementById('image-viewer-modal');
            if (imageViewerModal) {
                imageViewerModal.style.display = 'none';
            }
        });
    }
    
    // Close image viewer when clicking outside
    const imageViewerModal = document.getElementById('image-viewer-modal');
    if (imageViewerModal) {
        imageViewerModal.addEventListener('click', function(e) {
            if (e.target === imageViewerModal) {
                imageViewerModal.style.display = 'none';
            }
        });
    }
    
    // Make Epic Smiles modal draggable
    makeEpicSmilesDraggable();
    
    // Trash modal event handlers
    console.log('Setting up trash modal event handlers...');
    
    const trashClose = document.getElementById('trash-close');
    if (trashClose) {
        trashClose.addEventListener('click', function() {
            const trashModal = document.getElementById('trash-modal');
            if (trashModal) {
                trashModal.style.display = 'none';
                console.log('Trash modal closed via close button');
            }
        });
        console.log('Trash close button handler added');
    } else {
        console.error('Trash close button not found');
    }
    
    // Trash modal minimize handler
    const trashMinimize = document.querySelector('.trash-minimize');
    if (trashMinimize) {
        trashMinimize.addEventListener('click', function() {
            const trashModal = document.getElementById('trash-modal');
            if (trashModal) {
                trashModal.style.display = 'none';
                console.log('Trash modal minimized');
            }
        });
        console.log('Trash minimize button handler added');
    } else {
        console.error('Trash minimize button not found');
    }
    
    // Trash modal maximize handler
    const trashMaximize = document.querySelector('.trash-maximize');
    if (trashMaximize) {
        trashMaximize.addEventListener('click', function() {
            const trashModal = document.getElementById('trash-modal');
            if (trashModal) {
                trashModal.classList.toggle('trash-maximized');
                console.log('Trash modal toggled maximize');
            }
        });
        console.log('Trash maximize button handler added');
    } else {
        console.error('Trash maximize button not found');
    }
    
    // Close trash modal when clicking outside
    const trashModal = document.getElementById('trash-modal');
    if (trashModal) {
        trashModal.addEventListener('click', function(e) {
            if (e.target === trashModal) {
                trashModal.style.display = 'none';
                console.log('Trash modal closed via outside click');
            }
        });
        console.log('Trash modal outside click handler added');
    } else {
        console.error('Trash modal element not found during setup');
    }
    
    // Make trash modal draggable
    try {
        makeTrashDraggable();
        console.log('Trash modal draggable setup complete');
    } catch (error) {
        console.error('Error setting up trash modal draggable:', error);
    }
    
    // Pony gallery modal event handlers
    console.log('Setting up pony gallery modal event handlers...');
    
    const ponyGalleryModal = document.getElementById('pony-gallery-modal');
    if (ponyGalleryModal) {
        // Close pony gallery when clicking outside
        ponyGalleryModal.addEventListener('click', function(e) {
            if (e.target === ponyGalleryModal) {
                ponyGalleryModal.style.display = 'none';
                console.log('Pony gallery modal closed via outside click');
            }
        });
        console.log('Pony gallery modal outside click handler added');
    } else {
        console.error('Pony gallery modal element not found during setup');
    }
    
    // PFP Generator modal control handlers
    console.log('Setting up PFP Generator modal control handlers...');
    
    const pfpModal = document.getElementById('pfp-generator-modal');
    if (pfpModal) {
        console.log('PFP Generator modal found:', pfpModal);
        
        // Close button (red circle)
        const closeBtn = pfpModal.querySelector('.pfp-generator-close');
        console.log('Close button found:', closeBtn);
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                pfpModal.style.display = 'none';
                console.log('PFP Generator modal closed');
            });
            console.log('PFP Generator close button handler added');
        } else {
            console.error('PFP Generator close button not found');
        }
        
        // Minimize button (yellow circle)
        const minimizeBtn = pfpModal.querySelector('.pfp-generator-minimize');
        console.log('Minimize button found:', minimizeBtn);
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                pfpModal.style.display = 'none';
                console.log('PFP Generator modal minimized');
                // You could add minimize functionality here if needed
            });
            console.log('PFP Generator minimize button handler added');
        } else {
            console.error('PFP Generator minimize button not found');
        }
        
        // Maximize button (green circle)
        const maximizeBtn = pfpModal.querySelector('.pfp-generator-maximize');
        console.log('Maximize button handler added');
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Toggle between normal and maximized state
                pfpModal.classList.toggle('pfp-generator-maximized');
                console.log('PFP Generator modal maximize toggled');
            });
            console.log('PFP Generator maximize button handler added');
        } else {
            console.error('PFP Generator maximize button not found');
        }
        
        // Close when clicking outside the modal
        pfpModal.addEventListener('click', function(e) {
            if (e.target === pfpModal) {
                pfpModal.style.display = 'none';
                console.log('PFP Generator modal closed via outside click');
            }
        });
        console.log('PFP Generator outside click handler added');
        
    } else {
        console.error('PFP Generator modal element not found during setup');
    }
});

// Toggle SoundCloud Player Overlay
function toggleSoundcloudPlayer() {
    const overlay = document.querySelector('.soundcloud-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        // After overlay fades out, remove it completely
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

// Open Image Modal
function openImageModal(imageSrc) {
    console.log('Opening image modal with src:', imageSrc);
    const fullSizeImage = document.getElementById('full-size-image');
    const imageViewerModal = document.getElementById('image-viewer-modal');
    const imageViewerClose = document.getElementById('image-viewer-close');

    if (!fullSizeImage) {
        console.error('Error: full-size-image element not found.');
        return;
    }
    if (!imageViewerModal) {
        console.error('Error: image-viewer-modal element not found.');
        return;
    }
    if (!imageViewerClose) {
        console.warn('Warning: image-viewer-close element not found. Close button might not work.');
    }

    fullSizeImage.src = ''; // Clear previous image
    fullSizeImage.alt = 'Loading image...';
    imageViewerModal.style.display = 'block'; // Show modal immediately

    const loadImage = (src) => {
        fullSizeImage.src = src;
        fullSizeImage.onload = () => {
            console.log('Image loaded successfully:', src);
            fullSizeImage.alt = 'Full Size Image';
        };
        fullSizeImage.onerror = () => {
            console.error('Failed to load image:', src);
            fullSizeImage.alt = 'Error loading image';
        };
    };

    loadImage(imageSrc); // Try loading with original path

    // Add swipe up gesture support
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;

    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isDragging = true;
        imageViewerModal.style.transition = 'none';
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        // Only allow upward swipes (positive deltaY)
        if (deltaY > 0) {
            imageViewerModal.style.transform = `translateY(${deltaY}px)`;
            imageViewerModal.style.opacity = Math.max(0.3, 1 - (deltaY / 300));
        }
    };

    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        const deltaY = currentY - startY;
        const deltaTime = Date.now() - startTime;
        const velocity = deltaY / deltaTime;
        
        imageViewerModal.style.transition = 'all 0.3s ease-out';
        
        // Close modal if swiped up more than 100px or with high velocity
        if (deltaY > 100 || velocity > 0.5) {
            imageViewerModal.style.transform = 'translateY(100vh)';
            imageViewerModal.style.opacity = '0';
            setTimeout(() => {
                imageViewerModal.style.display = 'none';
                imageViewerModal.style.transform = 'translateY(0)';
                imageViewerModal.style.opacity = '1';
            }, 300);
        } else {
            // Snap back to original position
            imageViewerModal.style.transform = 'translateY(0)';
            imageViewerModal.style.opacity = '1';
        }
    };

    // Add event listeners for touch gestures
    imageViewerModal.addEventListener('touchstart', handleTouchStart, { passive: false });
    imageViewerModal.addEventListener('touchmove', handleTouchMove, { passive: false });
    imageViewerModal.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Add mouse drag support for desktop
    const handleMouseDown = (e) => {
        startY = e.clientY;
        startTime = Date.now();
        isDragging = true;
        imageViewerModal.style.transition = 'none';
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        currentY = e.clientY;
        const deltaY = currentY - startY;
        
        // Only allow upward drags (positive deltaY)
        if (deltaY > 0) {
            imageViewerModal.style.transform = `translateY(${deltaY}px)`;
            imageViewerModal.style.opacity = Math.max(0.3, 1 - (deltaY / 300));
        }
        e.preventDefault();
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        const deltaY = currentY - startY;
        const deltaTime = Date.now() - startTime;
        const velocity = deltaY / deltaTime;
        
        imageViewerModal.style.transition = 'all 0.3s ease-out';
        
        // Close modal if dragged up more than 100px or with high velocity
        if (deltaY > 100 || velocity > 0.5) {
            imageViewerModal.style.transform = 'translateY(100vh)';
            imageViewerModal.style.opacity = '0';
            setTimeout(() => {
                imageViewerModal.style.display = 'none';
                imageViewerModal.style.transform = 'translateY(0)';
                imageViewerModal.style.opacity = '1';
            }, 300);
        } else {
            // Snap back to original position
            imageViewerModal.style.transform = 'translateY(0)';
            imageViewerModal.style.opacity = '1';
        }
        e.preventDefault();
    };

    // Add mouse event listeners for desktop
    imageViewerModal.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Add click outside to close
    imageViewerModal.addEventListener('click', function(event) {
        if (event.target === imageViewerModal) {
            imageViewerModal.style.display = 'none';
            console.log('Image modal closed by clicking outside.');
        }
    });

    // Add keyboard support (ESC key)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            imageViewerModal.style.display = 'none';
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    document.addEventListener('keydown', handleKeyDown);

    console.log('Image modal should now be visible with swipe up support.');
}

// Make Epic Smiles Modal Draggable
function makeEpicSmilesDraggable() {
    const modal = document.getElementById('epic-smiles-modal');
    const dragHandle = document.getElementById('epic-smiles-drag-handle');
    
    if (!modal || !dragHandle) return;
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    dragHandle.addEventListener('mousedown', function(e) {
        // Don't start dragging if clicking on control buttons
        if (e.target.closest('.epic-smiles-control')) {
            return;
        }
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        // Get current position
        const rect = modal.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        // Add dragging class for visual feedback
        modal.classList.add('epic-smiles-dragging');
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const newLeft = startLeft + deltaX;
        const newTop = startTop + deltaY;
        
        // Update modal position
        modal.style.left = newLeft + 'px';
        modal.style.top = newTop + 'px';
        modal.style.transform = 'none'; // Remove default transform
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modal.classList.remove('epic-smiles-dragging');
        }
    });
    
    // Prevent text selection while dragging
    dragHandle.addEventListener('selectstart', function(e) {
        if (isDragging) {
            e.preventDefault();
            }
        });
    }
    


    // Make Trash Modal Draggable
    function makeTrashDraggable() {
        console.log('Setting up trash modal draggable...');
        
        const modal = document.getElementById('trash-modal');
        const dragHandle = document.getElementById('trash-drag-handle');
        
        if (!modal) {
            console.error('Trash modal not found for draggable setup');
            return;
        }
        
        if (!dragHandle) {
            console.error('Trash drag handle not found for draggable setup');
            return;
        }
        
        console.log('Trash modal and drag handle found, setting up events...');
        
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        dragHandle.addEventListener('mousedown', function(e) {
            // Don't start dragging if clicking on control buttons
            if (e.target.closest('.trash-control')) {
                return;
            }
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            // Get current position
            const rect = modal.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            // Add dragging class for visual feedback
            modal.classList.add('trash-dragging');
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newLeft = startLeft + deltaX;
            const newTop = startTop + deltaY;
            
            // Update modal position
            modal.style.left = newLeft + 'px';
            modal.style.top = newTop + 'px';
            modal.style.transform = 'none'; // Remove default transform
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                modal.classList.remove('trash-dragging');
            }
        });
        
        // Prevent text selection while dragging
        dragHandle.addEventListener('selectstart', function(e) {
            if (isDragging) {
                e.preventDefault();
            }
        });
    }
    
    // Make SoundCloud Modal Draggable
    function makeSoundcloudDraggable() {
    const modal = document.getElementById('soundcloud-modal');
    const dragHandle = document.getElementById('soundcloud-drag-handle');
    
    if (!modal || !dragHandle) return;
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    dragHandle.addEventListener('mousedown', function(e) {
        // Don't start dragging if clicking on control buttons
        if (e.target.closest('.soundcloud-control')) {
            return;
        }
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        // Get current position
        const rect = modal.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        // Add dragging class for visual feedback
        modal.classList.add('soundcloud-dragging');
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const newLeft = startLeft + deltaX;
        const newTop = startTop + deltaY;
        
        // Update modal position
        modal.style.left = newLeft + 'px';
        modal.style.top = newTop + 'px';
        modal.style.transform = 'none'; // Remove default transform
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modal.classList.remove('soundcloud-dragging');
        }
    });
    
    // Prevent text selection while dragging
    dragHandle.addEventListener('selectstart', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

    // 3D Model Loading and Rendering
let scene, camera, renderer, model;

function init3D() {
    console.log('Initializing 3D scene...');
    
    // First, let's test if Three.js is working at all
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded!');
        return;
    }
    
    console.log('Three.js version:', THREE.REVISION);
    
    const container = document.getElementById('3d-container');
    
    if (!container) {
        console.error('3D container not found!');
        return;
    }
    
    try {
        // Create scene
        scene = new THREE.Scene();
        scene.background = null; // Transparent background
        
        // Create camera
        camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        console.log('3D renderer created and added to container');
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        // Load the actual 3D model from epic-face folder
        console.log('Loading epic.obj model...');
        
        // Check if OBJLoader is available
        if (typeof THREE.OBJLoader !== 'undefined') {
            console.log('OBJLoader available, loading epic.obj...');
            
            // Load the texture first
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                'assets/epic-face/textures/epic_face_-_Copy.png',
                function(texture) {
                    console.log('Texture loaded successfully!');
                    
                    // Now load the OBJ model with the texture
                    const loader = new THREE.OBJLoader();
                    loader.load(
                        'assets/epic-face/source/epic.obj',
                        function(object) {
                            console.log('3D model loaded successfully!');
                            model = object;
                            
                            // Apply the texture to all materials in the model
                            object.traverse(function(child) {
                                if (child.isMesh) {
                                    child.material.map = texture;
                                    child.material.needsUpdate = true;
                                }
                            });
                            
                            // Center the model
                            const box = new THREE.Box3().setFromObject(model);
                            const center = box.getCenter(new THREE.Vector3());
                            model.position.sub(center);
                            
                            // Scale the model to fit nicely
                            const size = box.getSize(new THREE.Vector3());
                            const maxDim = Math.max(size.x, size.y, size.z);
                            const scale = 4 / maxDim; // Increased from 2 to 4 for bigger size
                            model.scale.setScalar(scale);
                            
                            scene.add(model);
                            console.log('Epic model with texture added to scene');
                        },
                        function(xhr) {
                            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                        },
                        function(error) {
                            console.error('Error loading 3D model:', error);
                                                // Fallback: create a simple spinning cube
                    const geometry = new THREE.BoxGeometry(4, 4, 4);
                    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
                    model = new THREE.Mesh(geometry, material);
                    scene.add(model);
                    console.log('Added fallback cube due to loading error');
                        }
                    );
                },
                function(xhr) {
                    console.log('Texture loading progress:', (xhr.loaded / xhr.total * 100) + '%');
                },
                function(error) {
                    console.error('Error loading texture:', error);
                    // Load model without texture
                    const loader = new THREE.OBJLoader();
                    loader.load(
                        'assets/epic-face/source/epic.obj',
                        function(object) {
                            console.log('3D model loaded without texture');
                            model = object;
                            
                            // Center and scale the model
                            const box = new THREE.Box3().setFromObject(model);
                            const center = box.getCenter(new THREE.Vector3());
                            model.position.sub(center);
                            
                            const size = box.getSize(new THREE.Vector3());
                            const maxDim = Math.max(size.x, size.y, size.z);
                            const scale = 4 / maxDim; // Increased from 2 to 4 for bigger size
                            model.scale.setScalar(scale);
                            
                            scene.add(model);
                        }
                    );
                }
            );
        } else {
            console.error('OBJLoader not available, using fallback cube');
            // Fallback: create a simple spinning cube
            const geometry = new THREE.BoxGeometry(4, 4, 4);
            const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
            model = new THREE.Mesh(geometry, material);
            scene.add(model);
            console.log('Added fallback cube');
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            if (model) {
                model.rotation.y += 0.03; // Faster rotation
            }
            
            renderer.render(scene, camera);
        }
        
        animate();
        console.log('Animation loop started');
        
    } catch (error) {
        console.error('Error in 3D initialization:', error);
    }
}



// Add some desktop interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up desktop interactivity...');
    
    const desktop = document.querySelector('.desktop');
    
    // Check if trash modal exists
    const trashModal = document.getElementById('trash-modal');
    if (trashModal) {
        console.log('Trash modal HTML found:', trashModal);
    } else {
        console.error('Trash modal HTML not found!');
    }
    
    // Initialize 3D scene
    init3D();
    
    // Right-click context menu prevention (optional)
    desktop.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Folder click handlers
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            const folderName = this.getAttribute('data-folder');
            console.log(`Clicked on ${folderName} folder`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Folder-specific functionality
            if (folderName === 'smile') {
                // Open Epic Smiles Gallery modal
                const epicSmilesModal = document.getElementById('epic-smiles-modal');
                if (epicSmilesModal) {
                    epicSmilesModal.style.display = 'block';
                }
            } else if (folderName === 'pony') {
                // TODO: Add pony folder functionality
                console.log('Pony folder clicked - functionality not implemented yet');
            }
        });
    });
    
    // RetroTunes button click handler
    const retrotunesButton = document.getElementById('retrotunes-button');
    if (retrotunesButton) {
        retrotunesButton.addEventListener('click', function() {
            console.log('RetroTunes button clicked');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Open RetroTunes modal
            openRetroTunes();
        });
    }
    
    // RetroTunes modal close handler
    const retrotunesClose = document.getElementById('retrotunes-close');
    if (retrotunesClose) {
        retrotunesClose.addEventListener('click', function() {
            closeRetroTunes();
        });
    }
    
    // Close modal when clicking outside
    const retrotunesModal = document.getElementById('retrotunes-modal');
    if (retrotunesModal) {
        retrotunesModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeRetroTunes();
            }
        });
    }
});

// RetroTunes functionality
function openRetroTunes() {
    const modal = document.getElementById('retrotunes-modal');
    const container = document.getElementById('retrotunes-container');
    
    if (modal && container) {
        modal.style.display = 'block';
        
        // Render RetroTunes React component
        renderRetroTunes(container);
        
        // Initialize drag functionality
        initDragToMove(modal);
    }
}

function closeRetroTunes() {
    const modal = document.getElementById('retrotunes-modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Clean up React component
        const container = document.getElementById('retrotunes-container');
        if (container) {
            container.innerHTML = '';
        }
    }
}

function renderRetroTunes(container) {
    try {
        // Create the RetroTunes component using vanilla JavaScript
        const RetroTunes = createRetroTunesComponent();
        if (RetroTunes && typeof RetroTunes.render === 'function') {
            RetroTunes.render();
        } else {
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Loading RetroTunes...</div>';
        }
    } catch (error) {
        console.error('Error rendering RetroTunes:', error);
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #ff0000;">Error loading RetroTunes</div>';
    }
}

function createRetroTunesComponent() {
    // Load the full RetroTunes component
    if (typeof createFullRetroTunesComponent === 'function') {
        return createFullRetroTunesComponent();
    } else {
        // Fallback if the component isn't loaded
        return {
            render: function() {
                const container = document.getElementById('retrotunes-container');
                if (container) {
                    container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Loading RetroTunes...</div>';
                }
            },
            destroy: function() {}
        };
    }
}

// Drag to move functionality
function initDragToMove(modal) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function dragStart(e) {
        if (e.target.closest('.mac-light.red') || e.target.closest('.retrotunes-close')) {
            return; // Don't start drag if clicking close buttons
        }
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === modal || e.target.closest('.retrotunes-modal-content')) {
            isDragging = true;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, modal);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    // Add event listeners
    modal.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch events for mobile
    modal.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        dragStart({ clientX: touch.clientX, clientY: touch.clientY, target: e.target });
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            drag({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => {} });
        }
    });
    
    document.addEventListener('touchend', dragEnd);
}



// Function to open trash modal
function openTrashModal() {
    const trashModal = document.getElementById('trash-modal');
    if (trashModal) {
        trashModal.style.display = 'block';
        console.log('Trash modal opened successfully');
    } else {
        console.error('Trash modal element not found');
    }
}

// Function to open pony folder from trash
function openPonyFolder() {
    console.log('DO NOT OPEN! folder clicked from trash...');
    
    // Close trash modal
    const trashModal = document.getElementById('trash-modal');
    if (trashModal) {
        trashModal.style.display = 'none';
        console.log('Trash modal closed');
    }
    
    // Open the pony gallery modal
    const ponyGalleryModal = document.getElementById('pony-gallery-modal');
    if (ponyGalleryModal) {
        ponyGalleryModal.style.display = 'flex';
        console.log('Pony gallery opened');
    } else {
        console.error('Pony gallery modal not found');
    }
}

// Function to close pony gallery
function closePonyGallery() {
    const ponyGalleryModal = document.getElementById('pony-gallery-modal');
    if (ponyGalleryModal) {
        ponyGalleryModal.style.display = 'none';
        console.log('Pony gallery closed');
    }
}

// Function to minimize pony gallery
function minimizePonyGallery() {
    const ponyGalleryModal = document.getElementById('pony-gallery-modal');
    if (ponyGalleryModal) {
        ponyGalleryModal.style.display = 'none';
        console.log('Pony gallery minimized');
    }
}

// Function to maximize pony gallery
function maximizePonyGallery() {
    const ponyGalleryModal = document.getElementById('pony-gallery-modal');
    if (ponyGalleryModal) {
        ponyGalleryModal.classList.toggle('epic-smiles-maximized');
        console.log('Pony gallery maximize toggled');
    }
}

// Function to make pony gallery draggable
function makePonyGalleryDraggable() {
    const modal = document.getElementById('pony-gallery-modal');
    const dragHandle = document.getElementById('pony-gallery-drag-handle');
    
    if (!modal || !dragHandle) return;
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === dragHandle) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, modal);
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

// PFP Generator functionality
let pfpAssets = {
    backgrounds: [],
    sceneFrame: [],
    base: [],
    special: [],
    accessories: [],
    hat: [],
    stickerTopRight: [],
    stickerRight: [],
    stickerTopLeft: [],
    stickerLeft: [],
    stickerMid: [],
    overlays: []
};

let currentAssetIndices = {
    backgrounds: 0,
    sceneFrame: 1, // Always start with scene frame selected
    base: 0,
    special: 0,
    accessories: 0,
    hat: 0,
    stickerTopRight: 0,
    stickerRight: 0,
    stickerTopLeft: 0,
    stickerLeft: 0,
    stickerMid: 0,
    overlays: 0
};

function initPFPGenerator() {
    loadPFPAssets();
    setupPFPCanvas();
    updateAllPreviews();
    setupPFPEventListeners();
    
    // Wait a bit for the canvas to be properly initialized
    setTimeout(() => {
        renderPFP();
    }, 100);
}

function setupPFPEventListeners() {
    // Add event listeners for category buttons
    const categoryButtons = document.querySelectorAll('.pfp-category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchToCategory(category);
        });
    });
    
    // Add event listener for download button
    const downloadButton = document.getElementById('download-pfp');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadPFP);
    }
    
    // Add event listener for randomize button
    const randomizeButton = document.getElementById('randomize-pfp');
    if (randomizeButton) {
        randomizeButton.addEventListener('click', randomizePFP);
    }
    
    // Add navigation buttons for each category
    addNavigationButtons();
}

function switchToCategory(category) {
    // Remove active class from all buttons
    document.querySelectorAll('.pfp-category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update previews for the selected category
    updateCategoryPreviews(category);
    
    console.log(`Switched to category: ${category}`);
}

function updateCategoryPreviews(category) {
    const assets = pfpAssets[category];
    if (!assets || assets.length === 0) {
        console.warn(`No assets found for category: ${category}`);
        return;
    }
    
    // Create or update preview container
    let previewContainer = document.getElementById('pfp-preview-container');
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.id = 'pfp-preview-container';
        previewContainer.className = 'pfp-preview-container';
        
        // Insert after the category buttons
        const categoryContainer = document.querySelector('.pfp-categories');
        if (categoryContainer) {
            categoryContainer.parentNode.insertBefore(previewContainer, categoryContainer.nextSibling);
        }
    }
    
    // Clear existing previews
    previewContainer.innerHTML = '';
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Options`;
    title.className = 'pfp-preview-title';
    previewContainer.appendChild(title);
    
    // Create preview grid
    const previewGrid = document.createElement('div');
    previewGrid.className = 'pfp-preview-grid';
    
    // Add preview images
    assets.forEach((asset, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'pfp-preview-item';
        previewItem.setAttribute('data-category', category);
        previewItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = asset;
        img.alt = `${category} ${index + 1}`;
        img.className = 'pfp-preview-img';
        
        // Add click handler to select this asset
        previewItem.addEventListener('click', function() {
            selectAsset(category, index);
        });
        
        previewItem.appendChild(img);
        previewGrid.appendChild(previewItem);
    });
    
    previewContainer.appendChild(previewGrid);
}

function selectAsset(category, index) {
    // Update current asset index
    currentAssetIndices[category] = index;
    
    // Re-render the PFP
    renderPFP();
    
    // Update visual feedback
    document.querySelectorAll('.pfp-preview-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`[data-category="${category}"][data-index="${index}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    console.log(`Selected ${category} asset ${index + 1}`);
}

function addNavigationButtons() {
    // Add previous/next buttons for each category
    const categoryButtons = document.querySelectorAll('.pfp-category-btn');
    categoryButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        
        // Create navigation container
        const navContainer = document.createElement('div');
        navContainer.className = 'pfp-nav-container';
        navContainer.style.display = 'none';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '◀';
        prevBtn.className = 'pfp-nav-btn pfp-prev-btn';
        prevBtn.addEventListener('click', () => navigateAsset(category, -1));
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '▶';
        nextBtn.className = 'pfp-nav-btn pfp-next-btn';
        nextBtn.addEventListener('click', () => navigateAsset(category, 1));
        
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        
        // Insert after the button
        button.parentNode.insertBefore(navContainer, button.nextSibling);
    });
}

function navigateAsset(category, direction) {
    const assets = pfpAssets[category];
    if (!assets || assets.length === 0) return;
    
    let currentIndex = currentAssetIndices[category] || 0;
    currentIndex += direction;
    
    // Wrap around
    if (currentIndex < 0) currentIndex = assets.length - 1;
    if (currentIndex >= assets.length) currentIndex = 0;
    
    selectAsset(category, currentIndex);
}

function loadPFPAssets() {
    // Load real images from images 2 folder for PFP assets
    pfpAssets.backgrounds = [
        'images 2/1 (1).jpg',
        'images 2/1 (2).jpg',
        'images 2/1 (3).jpg',
        'images 2/1 (4).jpg',
        'images 2/1 (5).jpg',
        'images 2/1 (6).jpg',
        'images 2/1 (7).jpg',
        'images 2/1 (8).jpg',
        'images 2/1 (9).jpg',
        'images 2/1 (10).jpg',
        'images 2/1 (11).jpg',
        'images 2/1 (12).jpg',
        'images 2/1 (13).jpg',
        'images 2/1 (14).jpg',
        'images 2/1 (15).jpg'
    ];
    
    pfpAssets.sceneFrame = [
        'images 2/1 (16).jpg',
        'images 2/1 (17).jpg',
        'images 2/1 (18).jpg',
        'images 2/1 (19).jpg',
        'images 2/1 (20).jpg',
        'images 2/1 (21).jpg',
        'images 2/1 (22).jpg',
        'images 2/1 (23).jpg',
        'images 2/1 (24).jpg',
        'images 2/1 (25).jpg',
        'images 2/1 (26).jpg',
        'images 2/1 (27).jpg',
        'images 2/1 (28).jpg',
        'images 2/1 (29).jpg',
        'images 2/1 (30).jpg'
    ];
    
    pfpAssets.base = [
        'images 2/1 (31).jpg',
        'images 2/1 (32).jpg',
        'images 2/1 (33).jpg',
        'images 2/1 (34).jpg',
        'images 2/1 (35).jpg',
        'images 2/1 (36).jpg',
        'images 2/1 (37).jpg',
        'images 2/1 (38).jpg',
        'images 2/1 (39).jpg',
        'images 2/1 (40).jpg',
        'images 2/1 (41).jpg',
        'images 2/1 (42).jpg',
        'images 2/1 (43).jpg',
        'images 2/1 (44).jpg',
        'images 2/1 (45).jpg'
    ];
    
    pfpAssets.special = [
        'images 2/1 (46).jpg',
        'images 2/1 (47).jpg',
        'images 2/1 (48).jpg',
        'images 2/1 (49).jpg',
        'images 2/1 (50).jpg',
        'images 2/1 (51).jpg',
        'images 2/1 (52).jpg',
        'images 2/1 (53).jpg',
        'images 2/1 (54).jpg',
        'images 2/1 (55).jpg',
        'images 2/1 (56).jpg',
        'images 2/1 (57).jpg',
        'images 2/1 (58).jpg',
        'images 2/1 (59).jpg',
        'images 2/1 (60).jpg'
    ];
    
    pfpAssets.accessories = [
        'images 2/1 (61).jpg',
        'images 2/1 (62).jpg',
        'images 2/1 (63).jpg',
        'images 2/1 (64).jpg',
        'images 2/1 (65).jpg',
        'images 2/1 (66).jpg',
        'images 2/1 (67).jpg',
        'images 2/1 (68).jpg',
        'images 2/1 (69).jpg',
        'images 2/1 (70).jpg',
        'images 2/1 (71).jpg',
        'images 2/1 (72).jpg',
        'images 2/1 (73).jpg',
        'images 2/1 (74).jpg',
        'images 2/1 (75).jpg'
    ];
    
    pfpAssets.hat = [
        'images 2/1 (76).jpg',
        'images 2/1 (77).jpg',
        'images 2/1 (78).jpg',
        'images 2/1 (79).jpg',
        'images 2/1 (1).png',
        'images 2/1 (2).png',
        'images 2/1 (3).png',
        'images 2/1 (4).png',
        'images 2/1 (5).jpg',
        'images 2/1 (6).jpg'
    ];
    
    pfpAssets.stickerTopRight = [
        'images 2/1 (7).jpg',
        'images 2/1 (8).jpg',
        'images 2/1 (9).jpg',
        'images 2/1 (10).jpg',
        'images 2/1 (11).jpg',
        'images 2/1 (12).jpg',
        'images 2/1 (13).jpg',
        'images 2/1 (14).jpg',
        'images 2/1 (15).jpg',
        'images 2/1 (16).jpg',
        'images 2/1 (17).jpg',
        'images 2/1 (18).jpg',
        'images 2/1 (19).jpg',
        'images 2/1 (20).jpg',
        'images 2/1 (21).jpg'
    ];
    
    pfpAssets.stickerRight = [
        'images 2/1 (22).jpg',
        'images 2/1 (23).jpg',
        'images 2/1 (24).jpg',
        'images 2/1 (25).jpg',
        'images 2/1 (26).jpg',
        'images 2/1 (27).jpg',
        'images 2/1 (28).jpg',
        'images 2/1 (29).jpg',
        'images 2/1 (30).jpg',
        'images 2/1 (31).jpg',
        'images 2/1 (32).jpg',
        'images 2/1 (33).jpg',
        'images 2/1 (34).jpg',
        'images 2/1 (35).jpg',
        'images 2/1 (36).jpg'
    ];
    
    pfpAssets.stickerTopLeft = [
        'images 2/1 (37).jpg',
        'images 2/1 (38).jpg',
        'images 2/1 (39).jpg',
        'images 2/1 (40).jpg',
        'images 2/1 (41).jpg',
        'images 2/1 (42).jpg',
        'images 2/1 (43).jpg',
        'images 2/1 (44).jpg',
        'images 2/1 (45).jpg',
        'images 2/1 (46).jpg',
        'images 2/1 (47).jpg',
        'images 2/1 (48).jpg',
        'images 2/1 (49).jpg',
        'images 2/1 (50).jpg',
        'images 2/1 (51).jpg',
        'images 2/1 (52).jpg',
        'images 2/1 (53).jpg',
        'images 2/1 (54).jpg',
        'images 2/1 (55).jpg',
        'images 2/1 (56).jpg'
    ];
    
    pfpAssets.stickerLeft = [
        'assets/pfp-generator/sticker left/Ancient_Statue_Epic_Face.png',
        'assets/pfp-generator/sticker left/annoying-orange.png',
        'assets/pfp-generator/sticker left/Anvil_Epic_Face.png',
        'assets/pfp-generator/sticker left/awp.png',
        'assets/pfp-generator/sticker left/Axe_Epic_Face.png',
        'assets/pfp-generator/sticker left/bit-me-bracelete.png',
        'assets/pfp-generator/sticker left/black-queen.png',
        'assets/pfp-generator/sticker left/bulbasor.png',
        'assets/pfp-generator/sticker left/Cactus_Epic_Face.png',
        'assets/pfp-generator/sticker left/diamond-sword.png',
        'assets/pfp-generator/sticker left/EMO-BOB.png',
        'assets/pfp-generator/sticker left/emo-zombie-cat.png',
        'assets/pfp-generator/sticker left/Epic_Cereal.png',
        'assets/pfp-generator/sticker left/fairy.png',
        'assets/pfp-generator/sticker left/Fire-boy.png',
        'assets/pfp-generator/sticker left/Flappy-bird.png',
        'assets/pfp-generator/sticker left/gold-axe.png',
        'assets/pfp-generator/sticker left/goth-little-pony.png',
        'assets/pfp-generator/sticker left/green-day.png',
        'assets/pfp-generator/sticker left/hello-kitty.png',
        'assets/pfp-generator/sticker left/hot-ponies.png',
        'assets/pfp-generator/sticker left/Internet_Epic_Face.png',
        'assets/pfp-generator/sticker left/krooked.png',
        'assets/pfp-generator/sticker left/Mango-monster.png',
        'assets/pfp-generator/sticker left/minecraft-scene.png',
        'assets/pfp-generator/sticker left/Og-monster.png',
        'assets/pfp-generator/sticker left/pack-a-punch.png',
        'assets/pfp-generator/sticker left/Pink-Zomboid.png',
        'assets/pfp-generator/sticker left/Popsicle_Epic_Face.png',
        'assets/pfp-generator/sticker left/rainbow-boots.png',
        'assets/pfp-generator/sticker left/rainbow-dike.png',
        'assets/pfp-generator/sticker left/Rotmg-white-bag.png',
        'assets/pfp-generator/sticker left/selfie.png',
        'assets/pfp-generator/sticker left/SKELE-PONY.png',
        'assets/pfp-generator/sticker left/ultra-rosa.png',
        'assets/pfp-generator/sticker left/ultra.png',
        'assets/pfp-generator/sticker left/Veigar.png',
        'assets/pfp-generator/sticker left/white-puffle.png',
        'assets/pfp-generator/sticker left/zomboid.png'
    ];
    
    pfpAssets.stickerMid = [
        'assets/pfp-generator/sticker mid/Chrome-swag-cros-Sp.png',
        'assets/pfp-generator/sticker mid/i-3-boobs.png',
        'assets/pfp-generator/sticker mid/rawr.png',
        'assets/pfp-generator/sticker mid/ygo-gx.png'
    ];
    
    pfpAssets.overlays = [
        'assets/pfp-generator/overlays/AND-#YOLO.png',
        'assets/pfp-generator/overlays/AND-BE--A-BELIEBER.png',
        'assets/pfp-generator/overlays/AND-BE-EPIC.png',
        'assets/pfp-generator/overlays/Electric-swag-overload.png',
        'assets/pfp-generator/overlays/HAIIIIII.png',
        'assets/pfp-generator/overlays/im-so-hardcore.png',
        'assets/pfp-generator/overlays/Internet-party.png',
        'assets/pfp-generator/overlays/Layer-79.png',
        'assets/pfp-generator/overlays/overlay.png',
        'assets/pfp-generator/overlays/pokemon-vmax.png',
        'assets/pfp-generator/overlays/scene-stickers.png',
        'assets/pfp-generator/overlays/TIME-TO-MAKE-CHANGES.png',
        'assets/pfp-generator/overlays/Trasher-overlay.png',
        'assets/pfp-generator/overlays/YOU-NEVER-KNOW--WHAT-YOU\'RE-GONNA-GET.png'
    ];
}

function setupPFPCanvas() {
    const canvas = document.getElementById('pfp-canvas');
    if (!canvas) return;
    
    // Ensure canvas has proper dimensions
    canvas.width = 500;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Set a default background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 500, 500);
}

function renderPFP() {
    const canvas = document.getElementById('pfp-canvas');
    if (!canvas) return;
    
    // Ensure canvas has proper dimensions
    if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = 500;
        canvas.height = 500;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, 500, 500);
    
    // Simple approach: draw everything in sequence with setTimeout to ensure proper order
    let currentStep = 0;
    
    function drawNextStep() {
        switch(currentStep) {
            case 0: // Background
                if (pfpAssets.backgrounds.length > 0 && currentAssetIndices.backgrounds > 0) {
                    const bgImg = new Image();
                    bgImg.onload = function() {
                        ctx.drawImage(bgImg, 0, 0, 500, 500);
                        currentStep = 1;
                        setTimeout(drawNextStep, 10); // Small delay to ensure drawing is complete
                    };
                    bgImg.onerror = function() {
                        console.warn('Failed to load background image:', bgImg.src);
                        currentStep = 1;
                        setTimeout(drawNextStep, 10);
                    };
                    bgImg.src = pfpAssets.backgrounds[currentAssetIndices.backgrounds - 1];
                } else {
                    currentStep = 1;
                    setTimeout(drawNextStep, 10);
                }
                break;
                
            case 1: // Scene Frame (always drawn after background)
                if (pfpAssets.sceneFrame.length > 0 && currentAssetIndices.sceneFrame > 0) {
                    const sceneFrameImg = new Image();
                    sceneFrameImg.onload = function() {
                        ctx.drawImage(sceneFrameImg, 0, 0, 500, 500);
                        currentStep = 2;
                        setTimeout(drawNextStep, 10);
                    };
                    sceneFrameImg.onerror = function() {
                        console.warn('Failed to load scene frame image');
                        currentStep = 2;
                        setTimeout(drawNextStep, 10);
                    };
                    sceneFrameImg.src = pfpAssets.sceneFrame[currentAssetIndices.sceneFrame - 1];
                } else {
                    currentStep = 2;
                    setTimeout(drawNextStep, 10);
                }
                break;
                
            case 2: // Base or Special Face
                if (pfpAssets.special.length > 0 && currentAssetIndices.special > 0) {
                    const specialImg = new Image();
                    specialImg.onload = function() {
                        ctx.drawImage(specialImg, 0, 0, 500, 500);
                        currentStep = 3;
                        setTimeout(drawNextStep, 10);
                    };
                    specialImg.onerror = function() {
                        console.warn('Failed to load special face image:', specialImg.src);
                        currentStep = 3;
                        setTimeout(drawNextStep, 10);
                    };
                    specialImg.src = pfpAssets.special[currentAssetIndices.special - 1];
                } else if (pfpAssets.base.length > 0 && currentAssetIndices.base > 0) {
                    const baseImg = new Image();
                    baseImg.onload = function() {
                        ctx.drawImage(baseImg, 0, 0, 500, 500);
                        currentStep = 3;
                        setTimeout(drawNextStep, 10);
                    };
                    baseImg.onerror = function() {
                        console.warn('Failed to load base image:', baseImg.src);
                        currentStep = 3;
                        setTimeout(drawNextStep, 10);
                    };
                    baseImg.src = pfpAssets.base[currentAssetIndices.base - 1];
                } else {
                    currentStep = 3;
                    setTimeout(drawNextStep, 10);
                }
                break;
                
            case 3: // Accessories
                if (pfpAssets.accessories.length > 0 && currentAssetIndices.accessories > 0) {
                    const accImg = new Image();
                    accImg.onload = function() {
                        ctx.drawImage(accImg, 0, 0, 500, 500);
                        currentStep = 4;
                        setTimeout(drawNextStep, 10);
                    };
                    accImg.onerror = function() {
                        console.warn('Failed to load accessories image:', accImg.src);
                        currentStep = 4;
                        setTimeout(drawNextStep, 10);
                    };
                    accImg.src = pfpAssets.accessories[currentAssetIndices.accessories - 1];
                } else {
                    currentStep = 4;
                    setTimeout(drawNextStep, 10);
                }
                break;
                
            case 4: // Hat
                if (pfpAssets.hat.length > 0 && currentAssetIndices.hat > 0) {
                    const hatImg = new Image();
                    hatImg.onload = function() {
                        ctx.drawImage(hatImg, 0, 0, 500, 500);
                        currentStep = 5;
                        setTimeout(drawNextStep, 10);
                    };
                    hatImg.onerror = function() {
                        console.warn('Failed to load hat image:', hatImg.src);
                        currentStep = 5;
                        setTimeout(drawNextStep, 10);
                    };
                    hatImg.src = pfpAssets.hat[currentAssetIndices.hat - 1];
                } else {
                    currentStep = 5;
                    setTimeout(drawNextStep, 10);
                }
                break;
                
            case 5: // Stickers
                drawStickers();
                break;
                
            case 6: // Overlays
                drawOverlays();
                break;
        }
    }
    
    // Start the rendering process
    drawNextStep();
    
    function drawStickers() {
        // Draw stickers in order
        let stickerCount = 0;
        const totalStickers = 5; // Updated to include sticker mid
        
        function drawNextSticker() {
            if (stickerCount >= totalStickers) {
                // Stickers done, now draw overlays
                currentStep = 6;
                setTimeout(drawNextStep, 10);
                return;
            }
            
            let stickerPath = '';
            
            switch(stickerCount) {
                case 0: // Top Right
                    if (pfpAssets.stickerTopRight.length > 0 && currentAssetIndices.stickerTopRight > 0) {
                        stickerPath = pfpAssets.stickerTopRight[currentAssetIndices.stickerTopRight - 1];
                    }
                    break;
                case 1: // Right
                    if (pfpAssets.stickerRight.length > 0 && currentAssetIndices.stickerRight > 0) {
                        stickerPath = pfpAssets.stickerRight[currentAssetIndices.stickerRight - 1];
                    }
                    break;
                case 2: // Top Left
                    if (pfpAssets.stickerTopLeft.length > 0 && currentAssetIndices.stickerTopLeft > 0) {
                        stickerPath = pfpAssets.stickerTopLeft[currentAssetIndices.stickerTopLeft - 1];
                    }
                    break;
                case 3: // Left
                    if (pfpAssets.stickerLeft.length > 0 && currentAssetIndices.stickerLeft > 0) {
                        stickerPath = pfpAssets.stickerLeft[currentAssetIndices.stickerLeft - 1];
                    }
                    break;
                case 4: // Mid
                    if (pfpAssets.stickerMid.length > 0 && currentAssetIndices.stickerMid > 0) {
                        stickerPath = pfpAssets.stickerMid[currentAssetIndices.stickerMid - 1];
                    }
                    break;
            }
            
            if (stickerPath) {
                const stickerImg = new Image();
                stickerImg.onload = function() {
                    ctx.drawImage(stickerImg, 0, 0, 500, 500);
                    stickerCount++;
                    drawNextSticker();
                };
                stickerImg.onerror = function() {
                    console.warn('Failed to load sticker image:', stickerImg.src);
                    stickerCount++;
                    drawNextSticker();
                };
                stickerImg.src = stickerPath;
            } else {
                stickerCount++;
                drawNextSticker();
            }
        }
        
        drawNextSticker();
    }
    
    function drawOverlays() {
        // Draw overlays
        if (pfpAssets.overlays.length > 0 && currentAssetIndices.overlays > 0) {
            const overlayImg = new Image();
            overlayImg.onload = function() {
                ctx.drawImage(overlayImg, 0, 0, 500, 500);
            };
            overlayImg.onerror = function() {
                console.warn('Failed to load overlay image:', overlayImg.src);
            };
            overlayImg.src = pfpAssets.overlays[currentAssetIndices.overlays - 1];
        }
    }
}



function updateAllPreviews() {
    updatePreview('backgrounds', 'background-name', 'background-counter');
    updatePreview('sceneFrame', 'sceneFrame-name', 'sceneFrame-counter');
    updatePreview('base', 'base-name', 'base-counter');
    updatePreview('special', 'special-name', 'special-counter');
    updatePreview('accessories', 'accessories-name', 'accessories-counter');
    updatePreview('hat', 'hat-name', 'hat-counter');
    updatePreview('stickerTopRight', 'stickerTopRight-name', 'stickerTopRight-counter');
    updatePreview('stickerRight', 'stickerRight-name', 'stickerRight-counter');
    updatePreview('stickerTopLeft', 'stickerTopLeft-name', 'stickerTopLeft-counter');
    updatePreview('stickerLeft', 'stickerLeft-name', 'stickerLeft-counter');
    updatePreview('stickerMid', 'stickerMid-name', 'stickerMid-counter');
    updatePreview('overlays', 'overlays-name', 'overlays-counter');
}

function updatePreview(assetType, nameId, counterId) {
    const nameElement = document.getElementById(nameId);
    const counterElement = document.getElementById(counterId);
    
    if (!nameElement || !counterElement) return;
    
    const assets = pfpAssets[assetType];
    const currentIndex = currentAssetIndices[assetType];
    
    if (assets.length === 0) {
        nameElement.textContent = 'No assets';
        counterElement.textContent = '0 / 0';
        return;
    }
    
    if (currentIndex === 0) {
        nameElement.textContent = 'None';
        counterElement.textContent = `0 / ${assets.length}`;
        return;
    }
    
    const assetPath = assets[currentIndex - 1];
    const fileName = assetPath.split('/').pop().replace('.png', '').replace('.jpg', '');
    
    nameElement.textContent = fileName;
    counterElement.textContent = `${currentIndex} / ${assets.length}`;
}

function nextAsset(assetType) {
    const assets = pfpAssets[assetType];
    if (assets.length === 0) return;
    
    currentAssetIndices[assetType]++;
    if (currentAssetIndices[assetType] > assets.length) {
        currentAssetIndices[assetType] = 0;
    }
    
    const nameId = `${assetType.replace(/([A-Z])/g, '-$1').toLowerCase()}-name`;
    const counterId = `${assetType.replace(/([A-Z])/g, '-$1').toLowerCase()}-counter`;
    
    updatePreview(assetType, nameId, counterId);
    
    // Wait a bit for updates to complete
    setTimeout(() => {
        renderPFP();
    }, 50);
}

function previousAsset(assetType) {
    const assets = pfpAssets[assetType];
    if (assets.length === 0) return;
    
    currentAssetIndices[assetType]--;
    if (currentAssetIndices[assetType] < 0) {
        currentAssetIndices[assetType] = assets.length;
    }
    
    const nameId = `${assetType.replace(/([A-Z])/g, '-$1').toLowerCase()}-name`;
    const counterId = `${assetType.replace(/([A-Z])/g, '-$1').toLowerCase()}-counter`;
    
    updatePreview(assetType, nameId, counterId);
    
    // Wait a bit for updates to complete
    setTimeout(() => {
        renderPFP();
    }, 50);
}

function randomizePFP() {
    Object.keys(currentAssetIndices).forEach(assetType => {
        const assets = pfpAssets[assetType];
        if (assets.length > 0) {
            // Randomize between 0 (none) and the number of assets
            currentAssetIndices[assetType] = Math.floor(Math.random() * (assets.length + 1));
        } else {
            currentAssetIndices[assetType] = 0;
        }
    });
    
    updateAllPreviews();
    
    // Wait a bit for updates to complete
    setTimeout(() => {
        renderPFP();
    }, 100);
}

function downloadPFP() {
    const canvas = document.getElementById('pfp-canvas');
    if (!canvas) {
        console.error('Canvas not found for download');
        return;
    }
    
    try {
        // Create download link
    const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `neuko-pfp-${timestamp}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        
        // Trigger download
        document.body.appendChild(link);
    link.click();
        document.body.removeChild(link);
        
        console.log('PFP downloaded successfully');
    } catch (error) {
        console.error('Error downloading PFP:', error);
        alert('Error downloading PFP. Please try again.');
    }
}

function sharePFP() {
    const canvas = document.getElementById('pfp-canvas');
    if (!canvas) return;
    
    // Convert canvas to blob
    canvas.toBlob(function(blob) {
        // Copy image to clipboard
        navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob
            })
        ]).then(function() {
            // Open Twitter with pre-filled text
            const tweetText = encodeURIComponent("@Ep1cNFTs Epic nft generator is soooooo #SWAG");
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
            window.open(twitterUrl, '_blank');
            
            // Show success message
            showNotification("Image copied to clipboard! Paste it in your tweet.", "success");
        }).catch(function(err) {
            console.error('Failed to copy image to clipboard:', err);
            // Fallback: download the image and open Twitter
            const link = document.createElement('a');
            link.download = 'epic-face-pfp.png';
            link.href = canvas.toDataURL();
            link.click();
            
            const tweetText = encodeURIComponent("@Ep1cNFTs Epic nft generator is soooooo #SWAG");
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
            window.open(twitterUrl, '_blank');
            
            showNotification("Image downloaded! Drag it into your tweet.", "info");
        });
    }, 'image/png');
}

// Make PFP Generator modal draggable
function makePFPGeneratorDraggable() {
    const modal = document.getElementById('pfp-generator-modal');
    const dragHandle = document.getElementById('pfp-generator-drag-handle');
    
    if (!modal || !dragHandle) return;
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        // Don't start dragging if clicking on control buttons
        if (e.target.closest('.pfp-generator-close') || 
            e.target.closest('.pfp-generator-minimize') || 
            e.target.closest('.pfp-generator-maximize')) {
            return;
        }
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === dragHandle || e.target.closest('.pfp-generator-modal-header')) {
            isDragging = true;
            modal.classList.add('pfp-generator-dragging');
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, modal);
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        modal.classList.remove('pfp-generator-dragging');
    }
}

// Initialize PFP Generator modal dragging when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    makePFPGeneratorDraggable();
});

// Notification function for user feedback
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== MOBILE TOUCH SUPPORT =====

// Add touch support for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add touch feedback for dock items
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 100);
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = '';
        });
    });
    
    // Add touch feedback for PFP navigation buttons
    const pfpNavBtns = document.querySelectorAll('.pfp-nav-btn');
    pfpNavBtns.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 100);
        });
        
        btn.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = '';
        });
    });
    
    // Add touch feedback for action buttons
    const actionBtns = document.querySelectorAll('.pfp-download-btn, .pfp-share-btn, .pfp-random-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 100);
        });
        
        btn.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = '';
        });
    });
    
    // Add touch feedback for gallery images
    const galleryImages = document.querySelectorAll('.epic-smiles-image');
    galleryImages.forEach(img => {
        img.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        img.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 100);
        });
        
        img.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = '';
        });
    });
    
    // Add touch feedback for modal controls
    const modalControls = document.querySelectorAll('.epic-smiles-control, .pony-gallery-control, .pfp-generator-control');
    modalControls.forEach(control => {
        control.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        control.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 100);
        });
        
        control.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = '';
        });
    });
    
    // Improve modal dragging for touch devices
    const modals = document.querySelectorAll('.epic-smiles-modal, .pony-gallery-modal, .pfp-generator-modal');
    modals.forEach(modal => {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        const dragHandle = modal.querySelector('.epic-smiles-modal-header, .pony-gallery-modal-header, .pfp-generator-modal-header');
        
        if (dragHandle) {
            dragHandle.addEventListener('touchstart', function(e) {
                isDragging = true;
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                
                const rect = modal.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;
                
                modal.style.transition = 'none';
                e.preventDefault();
            });
            
            document.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const touch = e.touches[0];
                const deltaX = touch.clientX - startX;
                const deltaY = touch.clientY - startY;
                
                modal.style.left = (startLeft + deltaX) + 'px';
                modal.style.top = (startTop + deltaY) + 'px';
                modal.style.transform = 'none';
                
                e.preventDefault();
            });
            
            document.addEventListener('touchend', function() {
                if (isDragging) {
                    isDragging = false;
                    modal.style.transition = '';
                }
            });
        }
    });
    
    // Add swipe gestures for gallery navigation (optional enhancement)
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only consider horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            // Swipe left or right - could be used for gallery navigation
            // This is a placeholder for future enhancement
        }
        
        startX = 0;
        startY = 0;
    });
    
    // Prevent context menu on long press for better mobile UX
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Add haptic feedback if available (for supported devices)
    function addHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10); // Short vibration
        }
    }
    
    // Add haptic feedback to important interactions
    dockItems.forEach(item => {
        item.addEventListener('touchend', addHapticFeedback);
    });
    
    actionBtns.forEach(btn => {
        btn.addEventListener('touchend', addHapticFeedback);
    });
});
