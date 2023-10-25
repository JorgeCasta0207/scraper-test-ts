const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

const navigationTimeout = 60000

puppeteer.launch({ headless: false }).then(async browser => {
  console.log('Running Tests....')
  const page = await browser.newPage()

  const url = 'https://www.kcra.com/'


 try{
  await page.goto(url, {waitUntil: 'load', timeout: 0})
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  console.log(`Screenshot captured right away pimp.✨`)
 } catch (error) {
  console.log('Navigation failed pimp:', error)
 } finally {
  await browser.close()
  console.log(`All done...`)
 }
});
