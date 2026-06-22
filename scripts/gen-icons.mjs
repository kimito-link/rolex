// 依存ライブラリなしで PWA 用アイコンPNGを生成するスクリプト。
// ロレックスの緑背景に、金色の王冠を模した簡易マークを描く。
// zlib(Node内蔵) で PNG を手組みする。実行: node scripts/gen-icons.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public");
mkdirSync(OUT_DIR, { recursive: true });

// 色（RGB）
const GREEN = [18, 119, 73]; // #127749
const GOLD = [201, 162, 39]; // #c9a227

// CRC32
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
  }
  return (~c) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// 王冠っぽい形を判定する関数（中央に台形＋3つの山＋下に帯）
function isCrown(x, y, size) {
  const u = x / size; // 0..1
  const v = y / size;
  // 帯（王冠の下部）
  if (v > 0.62 && v < 0.74 && u > 0.22 && u < 0.78) return true;
  // 本体（台形）
  if (v >= 0.4 && v <= 0.62) {
    const inset = (v - 0.4) * 0.0; // ほぼ垂直
    if (u > 0.24 + inset && u < 0.76 - inset) {
      return true;
    }
  }
  // 上部の3つの山（三角）
  if (v >= 0.28 && v <= 0.42) {
    const peaks = [0.32, 0.5, 0.68];
    const t = (v - 0.28) / (0.42 - 0.28); // 0(上)..1(下)
    const halfWidth = 0.06 * t + 0.01;
    for (const p of peaks) {
      if (u > p - halfWidth && u < p + halfWidth) return true;
    }
  }
  // 山の先端の玉
  if (v >= 0.24 && v < 0.3) {
    const peaks = [0.32, 0.5, 0.68];
    for (const p of peaks) {
      const dx = u - p;
      const dy = v - 0.27;
      if (dx * dx + dy * dy < 0.0009) return true;
    }
  }
  return false;
}

function buildPng(size, maskable) {
  // 各行: フィルタバイト(0) + RGBA*size
  const rowSize = 1 + size * 4;
  const raw = Buffer.alloc(rowSize * size);

  const r = size / 2;
  for (let y = 0; y < size; y++) {
    const rowStart = y * rowSize;
    raw[rowStart] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      let cr, cg, cb, ca = 255;

      // maskable は全面塗り、通常は角丸の円内のみ緑、外は透過
      const dx = x - r;
      const dy = y - r;
      const inCircle = dx * dx + dy * dy <= r * r * 0.98;

      if (maskable || inCircle) {
        if (isCrown(x, y, size)) {
          [cr, cg, cb] = GOLD;
        } else {
          [cr, cg, cb] = GREEN;
        }
      } else {
        cr = cg = cb = 0;
        ca = 0; // 透過
      }

      const off = rowStart + 1 + x * 4;
      raw[off] = cr;
      raw[off + 1] = cg;
      raw[off + 2] = cb;
      raw[off + 3] = ca;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = deflateSync(raw, { level: 9 });

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const targets = [
  { name: "icon-192.png", size: 192, maskable: false },
  { name: "icon-512.png", size: 512, maskable: false },
  { name: "icon-maskable-512.png", size: 512, maskable: true },
  { name: "apple-touch-icon.png", size: 180, maskable: true },
];

for (const t of targets) {
  const png = buildPng(t.size, t.maskable);
  writeFileSync(join(OUT_DIR, t.name), png);
  console.log(`generated ${t.name} (${t.size}x${t.size}, ${png.length} bytes)`);
}
