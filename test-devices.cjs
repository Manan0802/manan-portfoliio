/**
 * Multi-device screenshot test — iterative calibration
 * Uses Edge, tests at EXACT phone viewports
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DEVICES = [
  { name: '01_Redmi_Note13Pro5G', width: 393, height: 873 },
  { name: '02_Redmi_9A',          width: 360, height: 780 },
  { name: '03_OnePlus_Nord',      width: 412, height: 915 },
  { name: '04_Samsung_A14',       width: 384, height: 854 },
  { name: '05_iPhone_SE',         width: 375, height: 667 },
  { name: '06_Galaxy_S21',        width: 360, height: 800 },
  { name: '07_iPhone14ProMax',    width: 430, height: 932 },
  { name: '08_Pixel_7a',          width: 412, height: 846 },
  { name: '09_Desktop',           width: 1280, height: 800 },
  { name: '10_Galaxy_Fold',       width: 280, height: 653 },
  { name: '11_iPhone5_SE1',       width: 320, height: 568 },
];

const OUTPUT_DIR = path.join(__dirname, 'test-screenshots');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  
  console.log('Launching Edge...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const device of DEVICES) {
    console.log(`\n[${device.name}] ${device.width}x${device.height}`);
    
    const page = await browser.newPage();
    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: 1,
      isMobile: device.width < 768,
      hasTouch: device.width < 768,
    });

    try {
      // Use 'load' instead of 'networkidle0' to avoid Spline timeout
      await page.goto('http://localhost:5173', { waitUntil: 'load', timeout: 20000 });
      
      // Wait for Spline to render (fixed time)
      console.log(`  Waiting 15s for Spline 3D...`);
      await new Promise(r => setTimeout(r, 15000));

      const screenshotPath = path.join(OUTPUT_DIR, `${device.name}_${device.width}x${device.height}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  ✅ Saved: ${device.name}`);
    } catch (err) {
      console.log(`  ❌ Error: ${err.message.slice(0, 80)}`);
    }
    
    await page.close();
  }

  await browser.close();
  console.log('\n🎯 All tests complete!');
}

run().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
