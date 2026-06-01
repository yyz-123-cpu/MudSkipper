import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const source = path.join(rootDir, '图片', 'UI展示图.png');
const outputDir = path.join(rootDir, 'public', 'assets');

const crops = [
  ['map-satellite.png', { left: 200, top: 132, width: 638, height: 489 }],
  ['anomaly-03.png', { left: 883, top: 138, width: 106, height: 67 }],
  ['anomaly-05.png', { left: 883, top: 217, width: 106, height: 67 }],
  ['anomaly-06.png', { left: 883, top: 297, width: 106, height: 67 }],
  ['anomaly-07.png', { left: 883, top: 377, width: 106, height: 67 }],
  ['site-anomaly-05.png', { left: 883, top: 669, width: 263, height: 128 }],
];

await mkdir(outputDir, { recursive: true });

for (const [name, extract] of crops) {
  await sharp(source).extract(extract).png().toFile(path.join(outputDir, name));
}

console.log(`Generated ${crops.length} local UI assets in ${outputDir}`);
