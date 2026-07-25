/**
 * Writes utils/imageDimensions.json — the intrinsic pixel size of every file
 * under public/photos.
 *
 * The masonry gallery needs each photo's real aspect ratio to reserve the
 * right amount of space before the image loads; without it the columns
 * reflow as photos arrive. Dimensions are read straight from the JPEG/PNG
 * headers so this needs no dependency.
 *
 * Run `npm run photos:dimensions` after adding or replacing photos. If a
 * photo is missing from the map, utils/portfolio.ts throws at build time
 * rather than shipping a broken layout.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const photosDir = join(projectRoot, "public", "photos");
const outFile = join(projectRoot, "utils", "imageDimensions.json");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    // Start-of-frame markers carry the dimensions; SOF0-SOF15 minus the
    // DHT (c4), JPGA (c8) and DAC (cc) markers that share the range.
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isStartOfFrame) {
      return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const dimensions = {};
const unreadable = [];

for (const file of walk(photosDir).sort()) {
  const buf = readFileSync(file);
  const size = pngSize(buf) ?? jpegSize(buf);
  const url =
    "/" + relative(join(projectRoot, "public"), file).split(sep).join("/");
  if (size) dimensions[url] = size;
  else unreadable.push(url);
}

if (unreadable.length > 0) {
  console.error("Could not read dimensions for:\n  " + unreadable.join("\n  "));
  process.exit(1);
}

writeFileSync(outFile, JSON.stringify(dimensions, null, 2) + "\n");
console.log(
  `Wrote ${Object.keys(dimensions).length} entries to utils/imageDimensions.json`,
);
