const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'app', 'blog');

const entries = fs.readdirSync(blogDir, { withFileTypes: true });
const postDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

console.log(`🔧 Fixing Twitter metadata circular reference in ${postDirs.length} blog posts...\n`);

let fixedCount = 0;
let errorCount = 0;

postDirs.forEach((dir, index) => {
  const filePath = path.join(blogDir, dir, 'page.tsx');

  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');

      // Extract the description from the metadata export
      const descriptionMatch = content.match(/description:\s*"([^"]+)"/);

      if (descriptionMatch) {
        const actualDescription = descriptionMatch[1];

        // Replace metadata.description with the actual description string in Twitter section
        const updatedContent = content.replace(
          /twitter:\s*\{[^}]*description:\s*metadata\.description[^}]*\}/s,
          (match) => {
            return match.replace(/description:\s*metadata\.description/, `description: "${actualDescription}"`);
          }
        );

        // Only write if there was a change
        if (updatedContent !== content) {
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          fixedCount++;
          console.log(`✓ Fixed ${index + 1}/${postDirs.length}: ${dir}`);
        } else {
          console.log(`⊘ Skipped ${index + 1}/${postDirs.length}: ${dir} (no changes needed)`);
        }
      } else {
        console.log(`⚠ Warning ${index + 1}/${postDirs.length}: ${dir} (no description found)`);
        errorCount++;
      }
    } catch (error) {
      console.log(`✗ Error ${index + 1}/${postDirs.length}: ${dir} - ${error.message}`);
      errorCount++;
    }
  } else {
    console.log(`⊘ Missing ${index + 1}/${postDirs.length}: ${dir}/page.tsx not found`);
  }
});

console.log(`\n✅ Complete! Fixed ${fixedCount} posts with ${errorCount} errors.`);