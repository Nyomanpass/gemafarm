import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
await mkdir("frontend/public/images", { recursive: true });
const files = {
  "gambar1.jpeg": "cucumber",
  "gambar2.jpeg": "pakcoy",
  "gambar3.png": "harvest",
  "gambar4.png": "farm",
  "gambar5.png": "experience",
  "gambar6.jpeg": "farmer",
  "gambar7.jpeg": "lettuce",
  "gambar8.jpeg": "pepper",
  "gambar10.jpeg": "radish",
  "gambar11.jpeg": "vegetable-harvest",
  "gabar12.jpeg": "chili",
};
for (const [input, name] of Object.entries(files)) {
  await sharp(`img/${input}`)
    .resize({ width: name === "farm" ? 1920 : 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`frontend/public/images/${name}.webp`);
}
console.log(`${Object.keys(files).length} optimized WebP assets ready.`);

for (const file of ["logo.png", "logo_putih.png"]) {
  await copyFile(`img/${file}`, `frontend/public/images/${file}`);
}
