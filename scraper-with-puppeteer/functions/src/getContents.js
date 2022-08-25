/* eslint-env browser */
const puppeteer = require('puppeteer');

const getContents = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // Get contents
  const contentsSelector = 'your-contents-selector'
  const contents = await page.evaluate((selector) => {
    // Extract contents
    return { name: 'Kyohei Ogasawara' };
  }, contentsSelector);
  await browser.close();
  return contents;
};

exports.getContents = getContents;
