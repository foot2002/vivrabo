// 간단한 SVG 썸네일 생성 스크립트 (Node.js 환경에서 실행)
const fs = require('fs');
const path = require('path');

const colors = [
  { bg: '#3b82f6', text: '#ffffff' }, // Blue
  { bg: '#10b981', text: '#ffffff' }, // Green
  { bg: '#f59e0b', text: '#ffffff' }, // Yellow
  { bg: '#ef4444', text: '#ffffff' }, // Red
  { bg: '#8b5cf6', text: '#ffffff' }, // Purple
  { bg: '#ec4899', text: '#ffffff' }, // Pink
  { bg: '#06b6d4', text: '#ffffff' }, // Cyan
  { bg: '#84cc16', text: '#ffffff' }, // Lime
];

const thumbnailsDir = path.join(__dirname, '../public/thumbnails');

if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

colors.forEach((color, index) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="240" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="240" fill="${color.bg}"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${color.text}" text-anchor="middle" dominant-baseline="middle">Thumb ${index + 1}</text>
</svg>`;
  
  fs.writeFileSync(path.join(thumbnailsDir, `${index + 1}.svg`), svg);
});

console.log('Generated', colors.length, 'thumbnails');

