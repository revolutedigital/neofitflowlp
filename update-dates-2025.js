const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'app', 'blog');

// Get all directories in blog folder
const entries = fs.readdirSync(blogDir, { withFileTypes: true });
const postDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

console.log(`Found ${postDirs.length} blog posts to update`);

postDirs.forEach((dir, index) => {
  const filePath = path.join(blogDir, dir, 'page.tsx');

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all instances of 2024 with 2025
    const updatedContent = content
      .replace(/2024/g, '2025')
      .replace(/2023-12-26/g, '2025-10-01')
      .replace(/25\/12\/2023/g, '01/10/2025');

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Updated ${index + 1}/${postDirs.length}: ${dir}`);
  }
});

console.log('\n✅ All blog posts updated to 2025!');