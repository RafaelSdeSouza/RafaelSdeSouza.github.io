const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const out = process.argv[2];
  const base = process.argv[3];
  const pages = ['index', 'research', 'about', 'publications', 'software', 'people', 'writing', 'coin', 'contributions'];
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const errors = [];
  for (const width of [1440, 390]) {
    for (const name of pages) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      page.on('console', msg => { if (msg.type() === 'error') errors.push(`${name}@${width}: ${msg.text()}`); });
      page.on('pageerror', err => errors.push(`${name}@${width}: ${err.message}`));
      await page.goto(`${base}/${name}.html`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        rows: document.querySelectorAll('.catalogue-row, .mentor-row').length,
      }));
      if (metrics.scrollWidth > metrics.clientWidth) errors.push(`${name}@${width}: overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
      fs.writeFileSync(`${out}/${name}-${width}.json`, JSON.stringify(metrics));
      await page.close();
    }
  }
  await browser.close();
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  }
})();
