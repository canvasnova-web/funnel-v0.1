import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

async function walk(dir) {
    let files = await fs.promises.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fs.promises.stat(filePath);
        if (stats.isDirectory()) return walk(filePath);
        else if (stats.isFile()) return filePath;
    }));
    return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

async function convert() {
    console.log('Scanning files...');
    const files = await walk(publicDir);
    const imageFiles = files.filter(file => /\.(png|jpe?g)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to convert.`);

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const newFile = file.replace(new RegExp(`${ext}$`), '.webp');

        console.log(`Converting: ${path.relative(publicDir, file)} -> ${path.relative(publicDir, newFile)}`);

        try {
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(newFile);

            // Delete original
            await fs.promises.unlink(file);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
    console.log('Done!');
}

convert();
