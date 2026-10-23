import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:\\Users\\guilh\\Downloads\\ZIP bmwm3';
const TARGET_DIR = path.resolve('public', 'frames');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function processFrames() {
  console.log(`Checking source frames in: ${SOURCE_DIR}`);
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /^frame_\d+\.png$/i.test(f))
    .sort();

  console.log(`Found ${files.length} frames.`);

  const manifest = {
    totalFrames: files.length,
    format: 'webp',
    width: 1080,
    height: 1920,
    frames: []
  };

  let processed = 0;
  const startTime = Date.now();

  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const baseName = path.parse(file).name;
    const destWebp = path.join(TARGET_DIR, `${baseName}.webp`);

    manifest.frames.push(`/frames/${baseName}.webp`);

    if (!fs.existsSync(destWebp)) {
      await sharp(srcPath)
        .webp({ quality: 82, effort: 4 })
        .toFile(destWebp);
    }

    processed++;
    if (processed % 20 === 0 || processed === files.length) {
      console.log(`Progress: ${processed}/${files.length} frames processed.`);
    }
  }

  // Also create a tiny preview image of frame 1 for instant hero display
  const firstFrameSrc = path.join(SOURCE_DIR, files[0]);
  const previewPath = path.join(TARGET_DIR, 'preview.webp');
  await sharp(firstFrameSrc)
    .resize(540, 960)
    .webp({ quality: 60 })
    .toFile(previewPath);

  fs.writeFileSync(path.join(TARGET_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Done! ${files.length} frames prepared in ${totalTime}s.`);
}

processFrames().catch(err => {
  console.error('Error processing frames:', err);
  process.exit(1);
});
