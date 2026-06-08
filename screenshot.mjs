/**
 * screenshot.mjs — capture a localhost page with Puppeteer
 * Usage: node screenshot.mjs <url> [label]
 * Saves to ./temporary screenshots/screenshot-N[-label].png
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

/* auto-increment filename */
const existing = fs.existsSync(outDir)
  ? fs.readdirSync(outDir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
  : [];
const nums = existing.map(f => parseInt(f.replace('screenshot-', '').split(/[-\.]/)[0])).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const outPath  = path.join(outDir, filename);

const browser = await puppeteer.launch({
  executablePath: (() => {
    const candidates = [
      'C:/Users/Jia Long Yu/.cache/puppeteer/chrome/win64-131.0.6778.87/chrome-win64/chrome.exe',
      'C:/Users/nateh/.cache/puppeteer/chrome/win64-131.0.6778.87/chrome-win64/chrome.exe',
      process.env.PUPPETEER_EXECUTABLE_PATH,
    ].filter(Boolean);
    for (const c of candidates) if (fs.existsSync(c)) return c;
    return undefined; // let puppeteer find it
  })(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 800)); // let animations settle
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
