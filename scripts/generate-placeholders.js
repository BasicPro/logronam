const fs = require('fs');
const path = require('path');

// Create placeholder images for bars
const barImages = [
  'soriano-main.jpg',
  'soriano-interior.jpg', 
  'soriano-exterior.jpg',
  'blanco-negro-main.jpg',
  'blanco-negro-interior.jpg',
  'herrerias-main.jpg',
  'herrerias-interior.jpg'
];

// Create placeholder images for pintxos
const pintxoImages = [
  'champinon-plancha.jpg',
  'tortilla-patatas.jpg',
  'foie-manzana.jpg',
  'pimientos-piquillo.jpg'
];

// SVG template for placeholder
const createPlaceholderSVG = (text, width = 400, height = 300) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" fill="#9ca3af" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;

// Ensure directories exist
const barsDir = path.join(__dirname, '../public/images/bars');
const pintxosDir = path.join(__dirname, '../public/images/pintxos');

if (!fs.existsSync(barsDir)) {
  fs.mkdirSync(barsDir, { recursive: true });
}

if (!fs.existsSync(pintxosDir)) {
  fs.mkdirSync(pintxosDir, { recursive: true });
}

// Generate bar placeholders
barImages.forEach(imageName => {
  const imagePath = path.join(barsDir, imageName);
  const svgContent = createPlaceholderSVG(`Bar Image: ${imageName.replace('.jpg', '')}`);
  fs.writeFileSync(imagePath.replace('.jpg', '.svg'), svgContent);
});

// Generate pintxo placeholders
pintxoImages.forEach(imageName => {
  const imagePath = path.join(pintxosDir, imageName);
  const svgContent = createPlaceholderSVG(`Pintxo: ${imageName.replace('.jpg', '')}`, 300, 200);
  fs.writeFileSync(imagePath.replace('.jpg', '.svg'), svgContent);
});

console.log('Placeholder images generated successfully!');
