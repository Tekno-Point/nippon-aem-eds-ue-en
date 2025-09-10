import sass from 'sass';
import fs from 'fs';
import path from 'path';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Automatically ignore files starting with an underscore (_)
const ignoredFiles = [];

// Helper function to check if the file should be ignored (based on naming convention)
const shouldIgnore = (fileName) => {
  // Ignore files starting with '_'
  return fileName.startsWith('_') || ignoredFiles.includes(fileName);
};

const compileAndSave = async (sassFile) => {
  const dest = sassFile.replace(path.extname(sassFile), '.css');

  fs.writeFile(dest, sass.compile(sassFile).css, (err) => {
    if (err) console.log(err);
    console.log(`Compiled ${sassFile} to ${dest}`);
  });
};

const processFiles = async (parent) => {
  const files = await readdir(parent, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(parent, file.name);

    if (file.isDirectory()) {
      await processFiles(filePath);
    }
    if (path.extname(file.name) === '.scss') {
      if (!shouldIgnore(file.name)) {
        await compileAndSave(filePath);
      } else {
        console.log(`${file.name} has been explicitly ignored for compilation`);
      }
    }
  }
};

// Program execution process
for (const folder of ['styles', 'blocks']) {
  try {
    await processFiles(path.join(__dirname, folder));
  } catch (err) {
    console.error(err);
  }
}

// Watch for changes in SCSS files
fs.watch('.', { recursive: true }, (eventType, fileName) => {
  if (path.extname(fileName) === '.scss' && eventType === 'change') {
    if (!shouldIgnore(path.basename(fileName))) {
      compileAndSave(path.join(__dirname, fileName));
    } else {
      console.log(`${fileName} has been explicitly ignored for compilation`);
    }
  }
});