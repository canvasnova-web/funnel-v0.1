import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroImages = [
    'hero-pool-art.webp',
    'hero-pool-empty.webp',
    'hero-bedroom-art.webp',
    'hero-bedroom-empty.webp',
    'hero-gym-art.webp',
    'hero-gym-empty.webp',
    'hero-living-art.webp',
    'hero-living-empty.webp',
    'hero-office-art.webp',
    'hero-office-empty.webp'
];

const imagesDir = './public/images';

async function resizeImages() {
    for (const img of heroImages) {
        const inputPath = path.join(imagesDir, img);
        const outputPath = path.join(imagesDir, img.replace('.webp', '-mobile.webp'));

        try {
            await sharp(inputPath)
                .resize(768, null, { withoutEnlargement: true })
                .webp({ quality: 70 })
                .toFile(outputPath);

            const stat = fs.statSync(outputPath);
            console.log(`Created ${outputPath} (${(stat.size / 1024).toFixed(1)}KB)`);
        } catch (err) {
            console.error(`Failed to process ${img}:`, err.message);
        }
    }
}

resizeImages();
