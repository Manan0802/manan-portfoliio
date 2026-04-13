/**
 * Auto-calibration script — tests MULTIPLE left% values at each viewport
 * to find the exact value that centers the robot.
 * Uses a FIXED left% injected via CSS override (bypasses React logic).
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// Test at 3 key phone sizes: short (SE), medium (Redmi 13 Pro), tall (iPhone 14 PM)
const CALIBRATION_DEVICES = [
  { name: 'iPhone_SE',       width: 375, height: 667 },
  { name: 'Redmi_9A',        width: 360, height: 780 },
  { name: 'Redmi_13Pro',     width: 393, height: 873 },
  { name: 'Galaxy_S21',      width: 360, height: 800 },
  { name: 'iPhone14ProMax',  width: 430, height: 932 },
];

// Test these left% values for each device
const LEFT_VALUES = [45, 48, 50, 52, 55, 58, 60, 62, 65];

const OUTPUT_DIR = path.join(__dirname, 'calibration-screenshots');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  
  console.log('Launching Edge for calibration...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const device of CALIBRATION_DEVICES) {
    console.log(`\n═══ ${device.name} (${device.width}x${device.height}) ═══`);
    
    for (const leftPct of LEFT_VALUES) {
      const page = await browser.newPage();
      await page.setViewport({
        width: device.width,
        height: device.height,
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
      });

      try {
        await page.goto('http://localhost:5173', { waitUntil: 'load', timeout: 20000 });
        
        // Wait for Spline to render
        await new Promise(r => setTimeout(r, 12000));

        // OVERRIDE the left% using CSS injection  
        await page.evaluate((pct) => {
          // Find the canvas wrapper (the div with min-width: 200vh)
          const wrappers = document.querySelectorAll('[class*="overflow-hidden"] > div');
          for (const el of wrappers) {
            if (el.style.minWidth) {
              el.style.left = pct + '%';
              el.style.transform = 'translateX(-50%)';
            }
          }
        }, leftPct);

        // Small delay after CSS change
        await new Promise(r => setTimeout(r, 200));

        const fname = `${device.name}_${device.width}x${device.height}_left${leftPct}.png`;
        await page.screenshot({ path: path.join(OUTPUT_DIR, fname), fullPage: false });
        console.log(`  left:${leftPct}% → ✅`);
      } catch (err) {
        console.log(`  left:${leftPct}% → ❌ ${err.message.slice(0, 60)}`);
      }
      
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎯 Calibration complete! Check calibration-screenshots/');
}

run().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
