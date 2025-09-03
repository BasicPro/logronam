const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../public/locales');
const languages = ['en', 'es', 'fr', 'ca', 'pt', 'de', 'it'];

// Load Spanish as reference
const referenceFile = path.join(localesDir, 'es/common.json');
const reference = JSON.parse(fs.readFileSync(referenceFile, 'utf8'));

console.log('🔍 Checking translation files...\n');

let hasIssues = false;

languages.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'common.json');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing file: ${lang}/common.json`);
    hasIssues = true;
    return;
  }
  
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check for missing keys
    const missingKeys = findMissingKeys(reference, content);
    if (missingKeys.length > 0) {
      console.log(`⚠️  ${lang}: Missing keys:`, missingKeys.join(', '));
      hasIssues = true;
    } else {
      console.log(`✅ ${lang}: All keys present`);
    }
  } catch (error) {
    console.log(`❌ ${lang}: Invalid JSON - ${error.message}`);
    hasIssues = true;
  }
});

function findMissingKeys(ref, obj, prefix = '') {
  const missing = [];
  
  for (const key in ref) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (!(key in obj)) {
      missing.push(fullKey);
    } else if (typeof ref[key] === 'object' && ref[key] !== null) {
      missing.push(...findMissingKeys(ref[key], obj[key], fullKey));
    }
  }
  
  return missing;
}

if (!hasIssues) {
  console.log('\n🎉 All translation files are valid and complete!');
} else {
  console.log('\n⚠️  Some issues found. Please fix them before deploying.');
  process.exit(1);
}
