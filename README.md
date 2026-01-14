# Image Resizer & Background Remover

A web-based application for resizing images and removing backgrounds with a user-friendly interface and dark green theme.

## Features

- **Image Resizing**: Resize images with custom width and height
- **Aspect Ratio Control**: Option to maintain or ignore aspect ratio
- **Background Removal**: Background removal support (requires API integration)
- **Save Functionality**: Download processed images in PNG format
- **Modern UI**: Dark green themed interface
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
New Image Resizer/
├── index.html      # Main HTML file
├── app.js          # JavaScript application logic
├── styles.py       # Python styles (for reference/desktop version)
├── README.md       # This file
└── .gitignore      # Git ignore file
```

## Web Application Usage

1. **Open the Application**: Simply open `index.html` in any modern web browser

2. **Load an Image**: Click "Load Image" to select an image file

3. **Resize Image**:
   - Enter desired width and/or height
   - Check "Maintain Aspect Ratio" to keep proportions
   - Click "Resize Image"

4. **Remove Background**: Click "Remove Background" (requires API key integration)

5. **Save Image**: Click "Save Processed Image" to download your processed image

6. **Reset**: Click "Reset to Original" to restore the original image

## Supported Image Formats

- Input: JPG, JPEG, PNG, BMP, GIF, WEBP
- Output: PNG

## Background Removal

The background removal feature requires API integration. To enable it:

1. Sign up for a service like [remove.bg](https://www.remove.bg/api)
2. Get your API key
3. Uncomment and update the API integration code in `app.js`
4. Add your API key to the `REMOVE_BG_API_KEY` constant

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API for image processing

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- All image processing is done client-side in your browser
- No data is sent to external servers (except if you enable background removal API)
- PNG format preserves transparency
- The application works offline once loaded

## License

This project is open source and available for personal and commercial use.
