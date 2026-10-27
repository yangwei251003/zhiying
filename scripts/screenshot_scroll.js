const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // 滚动到 how-it-works section
  const howItWorks = await page.locator('h2:has-text("五步完成")').first();
  if (howItWorks) {
    await howItWorks.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:\\Users\\yangwei\\WorkBuddy\\2026-06-21-04-31-50\\outputs\\screenshot-howitworks.png' });
  }
  
  await browser.close();
})();
