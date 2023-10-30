const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const url = 'https://www.youtube.com/';
const searchTermCLI = process.argv.length > 2 ? process.argv[2] : 'Nissan GTR R35';
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#search-input #search');
    await page.type('#search-input #search', searchTermCLI, { delay: 200 });
    await page.screenshot({ path: './youtube-test.png' });
    await browser.close();
})();
