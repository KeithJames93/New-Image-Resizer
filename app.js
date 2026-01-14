/**
 * Image Resizer & Background Remover - JavaScript Application
 * Handles image loading, resizing, background removal, and saving functionality
 */

// Global state variables
let originalImage = null;
let processedImage = null;
let originalImageData = null;

// DOM element references
const imageInput = document.getElementById('imageInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const aspectRatioCheck = document.getElementById('aspectRatio');
const resizeBtn = document.getElementById('resizeBtn');
const removeBgBtn = document.getElementById('removeBgBtn');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const displayImage = document.getElementById('displayImage');
const imageContainer = document.getElementById('imageContainer');
const infoMessage = document.getElementById('infoMessage');
const loadingBg = document.getElementById('loadingBg');
const canvas = document.getElementById('canvas');

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

/**
 * Set up all event listeners
 */
function initializeEventListeners() {
    // Load image
    imageInput.addEventListener('change', handleImageLoad);

    // Resize image
    resizeBtn.addEventListener('click', handleResize);

    // Remove background
    removeBgBtn.addEventListener('click', handleBackgroundRemoval);

    // Save image
    saveBtn.addEventListener('click', handleSave);

    // Reset to original
    resetBtn.addEventListener('click', handleReset);
}

/**
 * Handle image loading from file input
 */
function handleImageLoad(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            processedImage = img;
            originalImageData = event.target.result;
            displayImage.src = event.target.result;
            displayImage.style.display = 'block';
            imageContainer.classList.remove('empty');
            
            // Enable buttons
            enableButtons();
            
            // Update placeholders with current dimensions
            updateDimensionPlaceholders();
            
            showMessage('Image loaded successfully!', 'success');
        };
        img.onerror = function() {
            showMessage('Failed to load image. Please try another file.', 'error');
        };
        img.src = event.target.result;
    };
    reader.onerror = function() {
        showMessage('Error reading file.', 'error');
    };
    reader.readAsDataURL(file);
}

/**
 * Handle image resizing
 */
function handleResize() {
    if (!originalImage) {
        showMessage('Please load an image first!', 'error');
        return;
    }

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    if (!width && !height) {
        showMessage('Please enter at least width or height!', 'error');
        return;
    }

    if (width < 1 || height < 1) {
        showMessage('Dimensions must be positive numbers!', 'error');
        return;
    }

    const aspectRatio = originalImage.width / originalImage.height;
    let newWidth = width || originalImage.width;
    let newHeight = height || originalImage.height;

    // Maintain aspect ratio if checkbox is checked
    if (aspectRatioCheck.checked) {
        if (width && height) {
            // Both dimensions provided - adjust to maintain aspect ratio
            if (newWidth / newHeight > aspectRatio) {
                newWidth = Math.round(newHeight * aspectRatio);
            } else {
                newHeight = Math.round(newWidth / aspectRatio);
            }
        } else if (width) {
            // Only width provided
            newHeight = Math.round(newWidth / aspectRatio);
        } else {
            // Only height provided
            newWidth = Math.round(newHeight * aspectRatio);
        }
    }

    // Resize image using canvas
    resizeImageOnCanvas(newWidth, newHeight);
    showMessage(`Image resized to ${newWidth}x${newHeight}!`, 'success');
}

/**
 * Resize image using canvas
 */
function resizeImageOnCanvas(newWidth, newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    
    // Use high-quality image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(processedImage, 0, 0, newWidth, newHeight);

    // Update processed image
    const dataURL = canvas.toDataURL('image/png');
    processedImage = new Image();
    processedImage.onload = function() {
        displayImage.src = dataURL;
    };
    processedImage.src = dataURL;
}

/**
 * Handle background removal
 */
async function handleBackgroundRemoval() {
    if (!originalImage) {
        showMessage('Please load an image first!', 'error');
        return;
    }

    loadingBg.classList.add('active');
    removeBgBtn.disabled = true;

    try {
        // Convert image to blob
        canvas.width = processedImage.width;
        canvas.height = processedImage.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(processedImage, 0, 0);

        canvas.toBlob(async function(blob) {
            try {
                // Note: This is a placeholder. For actual background removal,
                // you would need to use a service like remove.bg API or
                // implement a client-side solution with a library like @tensorflow/tfjs
                
                // For demonstration, we'll show a message
                showMessage('Background removal requires an API key. Please use the desktop application for this feature.', 'error');
                
                // Alternative: Use remove.bg API (requires API key)
                // Uncomment and add your API key to use:
                /*
                const REMOVE_BG_API_KEY = 'YOUR_API_KEY_HERE';
                const formData = new FormData();
                formData.append('image_file', blob);
                const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                    method: 'POST',
                    headers: { 'X-Api-Key': REMOVE_BG_API_KEY },
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                
                const result = await response.blob();
                const url = URL.createObjectURL(result);
                displayImage.src = url;
                
                processedImage = new Image();
                processedImage.onload = function() {
                    processedImage.src = url;
                    showMessage('Background removed successfully!', 'success');
                };
                processedImage.src = url;
                */
                
            } catch (error) {
                showMessage('Failed to remove background: ' + error.message, 'error');
            } finally {
                loadingBg.classList.remove('active');
                removeBgBtn.disabled = false;
            }
        }, 'image/png');
    } catch (error) {
        showMessage('Failed to remove background: ' + error.message, 'error');
        loadingBg.classList.remove('active');
        removeBgBtn.disabled = false;
    }
}

/**
 * Handle saving the processed image
 */
function handleSave() {
    if (!processedImage) {
        showMessage('No processed image to save!', 'error');
        return;
    }

    try {
        const link = document.createElement('a');
        link.download = 'processed-image.png';
        link.href = displayImage.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showMessage('Image saved successfully!', 'success');
    } catch (error) {
        showMessage('Failed to save image: ' + error.message, 'error');
    }
}

/**
 * Handle resetting to original image
 */
function handleReset() {
    if (originalImageData) {
        processedImage = originalImage;
        displayImage.src = originalImageData;
        widthInput.value = '';
        heightInput.value = '';
        showMessage('Image reset to original!', 'success');
    }
}

/**
 * Enable all action buttons
 */
function enableButtons() {
    resizeBtn.disabled = false;
    removeBgBtn.disabled = false;
    saveBtn.disabled = false;
    resetBtn.disabled = false;
}

/**
 * Update dimension input placeholders with current image dimensions
 */
function updateDimensionPlaceholders() {
    if (originalImage) {
        widthInput.placeholder = `Current: ${originalImage.width}px`;
        heightInput.placeholder = `Current: ${originalImage.height}px`;
    }
}

/**
 * Show message to user
 * @param {string} message - Message to display
 * @param {string} type - Message type: 'success' or 'error'
 */
function showMessage(message, type) {
    infoMessage.textContent = message;
    infoMessage.className = 'info-message show';
    
    if (type === 'error') {
        infoMessage.classList.add('error');
    } else {
        infoMessage.classList.remove('error');
    }
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        infoMessage.classList.remove('show');
    }, 3000);
}
