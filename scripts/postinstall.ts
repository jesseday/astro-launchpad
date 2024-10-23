import * as fs from 'fs';
import * as path from 'path';

// Define the source directory where the templates are located
const sourceDir = path.join(__dirname, 'templates');

// Define the target directory where the templates should be copied
const targetDir = path.join(process.cwd(), 'launchpad');

// Function to copy files from source to target directory
function copyTemplates(srcDir: string, destDir: string) {
    // Ensure the target directory exists or create it
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Read all files from the source directory
    const files = fs.readdirSync(srcDir);

    // Copy each file to the target directory
    files.forEach(file => {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);

        // Copy file
        fs.copyFileSync(srcFile, destFile);
    });
}

// Execute the copy function
copyTemplates(sourceDir, targetDir);