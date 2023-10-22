// import puppeteer from 'puppeteer';

// async function takeScreenshot() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://bot.sannysoft.com/');
//   await page.screenshot({ path: 'example.png' });
//   await browser.close();
// }

// takeScreenshot();


const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


puppeteer.launch({ headless: true }).then(async browser => {
  console.log('Running Tests....')
  const page = await browser.newPage()
  await page.goto('https://bot.sannysoft.com/')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})
