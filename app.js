// Global variables
let originalImage = null;
let currentCanvas = null;
let currentContext = null;
let originalWidth = 0;
let originalHeight = 0;

// DOM elements
const imageInput = document.getElementById('imageInput');
const controlsSection = document.getElementById('controlsSection');
const imageCanvas = document.getElementById('imageCanvas');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const maintainAspectRatio = document.getElementById('maintainAspectRatio');
const resizeBtn = document.getElementById('resizeBtn');
const removeBgBtn = document.getElementById('removeBgBtn');
const resetBtn = document.getElementById('resetBtn');
const saveBtn = document.getElementById('saveBtn');
const thresholdInput = document.getElementById('thresholdInput');
const thresholdValue = document.getElementById('thresholdValue');

// Initialize canvas
currentCanvas = imageCanvas;
currentContext = imageCanvas.getContext('2d');

// Load image when file is selected
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                originalWidth = img.width;
                originalHeight = img.height;
                widthInput.value = img.width;
                heightInput.value = img.height;
                drawImage(img);
                controlsSection.style.display = 'grid';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Draw image on canvas
function drawImage(img) {
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    currentContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    currentContext.drawImage(img, 0, 0);
}

// Resize image
resizeBtn.addEventListener('click', () => {
    if (!originalImage) return;

    let newWidth = parseInt(widthInput.value) || originalImage.width;
    let newHeight = parseInt(heightInput.value) || originalImage.height;

    if (maintainAspectRatio.checked) {
        const aspectRatio = originalImage.width / originalImage.height;
        if (widthInput.value && !heightInput.value) {
            newHeight = newWidth / aspectRatio;
            heightInput.value = Math.round(newHeight);
        } else if (heightInput.value && !widthInput.value) {
            newWidth = newHeight * aspectRatio;
            widthInput.value = Math.round(newWidth);
        } else if (widthInput.value && heightInput.value) {
            // Use the dimension that was changed last
            const widthRatio = newWidth / originalImage.width;
            const heightRatio = newHeight / originalImage.height;
            if (widthRatio < heightRatio) {
                newHeight = newWidth / aspectRatio;
                heightInput.value = Math.round(newHeight);
            } else {
                newWidth = newHeight * aspectRatio;
                widthInput.value = Math.round(newWidth);
            }
        }
    }

    imageCanvas.width = newWidth;
    imageCanvas.height = newHeight;
    currentContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    currentContext.drawImage(originalImage, 0, 0, newWidth, newHeight);
    
    // Update original image reference for background removal
    const resizedImg = new Image();
    resizedImg.src = imageCanvas.toDataURL();
    resizedImg.onload = () => {
        originalImage = resizedImg;
    };
});

// Maintain aspect ratio when width changes
widthInput.addEventListener('input', () => {
    if (maintainAspectRatio.checked && originalImage) {
        const aspectRatio = originalImage.width / originalImage.height;
        const newWidth = parseInt(widthInput.value) || originalImage.width;
        heightInput.value = Math.round(newWidth / aspectRatio);
    }
});

// Maintain aspect ratio when height changes
heightInput.addEventListener('input', () => {
    if (maintainAspectRatio.checked && originalImage) {
        const aspectRatio = originalImage.width / originalImage.height;
        const newHeight = parseInt(heightInput.value) || originalImage.height;
        widthInput.value = Math.round(newHeight * aspectRatio);
    }
});

// Update threshold value display
thresholdInput.addEventListener('input', (e) => {
    thresholdValue.textContent = e.target.value;
});

// Remove background using edge detection and flood fill
removeBgBtn.addEventListener('click', () => {
    if (!originalImage) return;

    const threshold = parseInt(thresholdInput.value);
    const imageData = currentContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    const width = imageCanvas.width;
    const height = imageCanvas.height;

    // Create a mask for background pixels
    const mask = new Array(width * height).fill(false);
    const visited = new Array(width * height).fill(false);

    // Edge detection and background removal algorithm
    // This uses a combination of edge detection and color similarity
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            // Skip transparent pixels
            if (a < 128) {
                mask[y * width + x] = true;
                continue;
            }

            // Calculate edge strength using Sobel operator
            let edgeStrength = 0;
            if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
                const gx = getGradientX(data, width, x, y);
                const gy = getGradientY(data, width, x, y);
                edgeStrength = Math.sqrt(gx * gx + gy * gy);
            }

            // If edge strength is low, it might be background
            // Also check if pixel is similar to corners (likely background)
            const isCorner = (x < 5 || x > width - 5) && (y < 5 || y > height - 5);
            const cornerSimilarity = isCorner ? getCornerSimilarity(data, width, height, x, y, r, g, b) : 0;

            // Mark as background if low edge strength and similar to corners
            if (edgeStrength < threshold && cornerSimilarity > 0.7) {
                mask[y * width + x] = true;
            }
        }
    }

    // Flood fill from edges to remove background
    const queue = [];
    for (let y = 0; y < height; y++) {
        queue.push([0, y]);
        queue.push([width - 1, y]);
    }
    for (let x = 0; x < width; x++) {
        queue.push([x, 0]);
        queue.push([x, height - 1]);
    }

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        const idx = y * width + x;
        
        if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) continue;
        visited[idx] = true;

        const pixelIdx = idx * 4;
        const r = data[pixelIdx];
        const g = data[pixelIdx + 1];
        const b = data[pixelIdx + 2];

        // Check similarity to neighbors
        let isBackground = true;
        const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dx, dy] of neighbors) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = (ny * width + nx) * 4;
                const nr = data[nIdx];
                const ng = data[nIdx + 1];
                const nb = data[nIdx + 2];
                
                const similarity = getColorSimilarity(r, g, b, nr, ng, nb);
                if (similarity < (100 - threshold) / 100) {
                    isBackground = false;
                    break;
                }
            }
        }

        if (isBackground || mask[idx]) {
            mask[idx] = true;
            for (const [dx, dy] of neighbors) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[ny * width + nx]) {
                    queue.push([nx, ny]);
                }
            }
        }
    }

    // Apply mask - make background transparent
    for (let i = 0; i < data.length; i += 4) {
        const pixelIdx = i / 4;
        if (mask[pixelIdx]) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
    }

    currentContext.putImageData(imageData, 0, 0);
});

// Helper function to calculate gradient in X direction
function getGradientX(data, width, x, y) {
    const idx = (y * width + x) * 4;
    const left = (y * width + (x - 1)) * 4;
    const right = (y * width + (x + 1)) * 4;
    
    const leftGray = (data[left] + data[left + 1] + data[left + 2]) / 3;
    const rightGray = (data[right] + data[right + 1] + data[right + 2]) / 3;
    
    return rightGray - leftGray;
}

// Helper function to calculate gradient in Y direction
function getGradientY(data, width, x, y) {
    const idx = (y * width + x) * 4;
    const top = ((y - 1) * width + x) * 4;
    const bottom = ((y + 1) * width + x) * 4;
    
    const topGray = (data[top] + data[top + 1] + data[top + 2]) / 3;
    const bottomGray = (data[bottom] + data[bottom + 1] + data[bottom + 2]) / 3;
    
    return bottomGray - topGray;
}

// Helper function to check similarity to corner pixels
function getCornerSimilarity(data, width, height, x, y, r, g, b) {
    const corners = [
        [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]
    ];
    
    let maxSimilarity = 0;
    for (const [cx, cy] of corners) {
        const idx = (cy * width + cx) * 4;
        const cr = data[idx];
        const cg = data[idx + 1];
        const cb = data[idx + 2];
        const similarity = getColorSimilarity(r, g, b, cr, cg, cb);
        maxSimilarity = Math.max(maxSimilarity, similarity);
    }
    
    return maxSimilarity;
}

// Helper function to calculate color similarity
function getColorSimilarity(r1, g1, b1, r2, g2, b2) {
    const dr = r1 - r2;
    const dg = g1 - g2;
    const db = b1 - b2;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    return 1 - (distance / 441.67); // 441.67 is max distance (sqrt(255^2 * 3))
}

// Reset to original image
resetBtn.addEventListener('click', () => {
    if (!originalImage) return;
    
    // Reload original image
    const img = new Image();
    img.onload = () => {
        originalImage = img;
        originalWidth = img.width;
        originalHeight = img.height;
        widthInput.value = img.width;
        heightInput.value = img.height;
        drawImage(img);
    };
    
    // Get original image from file input
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Save image
saveBtn.addEventListener('click', () => {
    if (!originalImage) return;

    const link = document.createElement('a');
    link.download = 'processed-image.png';
    link.href = imageCanvas.toDataURL('image/png');
    link.click();
});
