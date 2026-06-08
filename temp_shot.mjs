import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

const pages = [
  ['http://localhost:3000/index.html',      'final-home'],
  ['http://localhost:3000/about.html',      'final-about'],
  ['http://localhost:3000/products.html',   'final-products'],
  ['http://localhost:3000/services.html',   'final-services'],
  ['http://localhost:3000/references.html', 'final-refs'],
  ['http://localhost:3000/contact.html',    'final-contact'],
];

for (const [url, label] of pages) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.evaluate(() => document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, label + '.png') });
  console.log(label, '→', page.url());
}
await browser.close();
