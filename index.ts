const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());


const url = 'https://www.youtube.com/';


const searchTermCLI = process.argv.length > 2 ? process.argv[2] : "Nissan GTR R35";



(async () => {

  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36']
  });
  
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector('#search-input #search');
  await page.type('#search-input #search', searchTermCLI, {delay: 200});

  await Promise.all([
    page.waitForNavigation(),
    page.click('#search-icon-legacy'),
  ])

  await page.waitForSelector('ytd-video-renderer h3 a#video-title');
  await page.screenshot({path: './youtube-click.png'});

  const firstMatch = await page.$eval('ytd-video-renderer h3 a#video-title', (elem) => {
    return elem.innerText;
  })
  console.log({firstMatch})

  await Promise.all([

    page.waitForNavigation(),
    page.click('ytd-video-renderer h3 a#video-title'),
  ]);

  await page.waitForTimeout(20000);

  await page.click('button.ytp-play-button.ytp-button');

  await page.waitForTimeout(20000);

  // await Promise.all([

  //   page.waitForNavigation(),
  //   page.click('button.ytp-play-button.ytp-button'),
  //   new Promise(resolve => setTimeout(resolve, 2000))
  // ]);
  await page.screenshot({path: './main-screenshot.jpg'});


 await browser.close();
})();
