/* eslint-env browser */
const puppeteer = require('puppeteer');

const getPageCount = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // Get page count
  const pageCountSelector = 'your-page-count-selector';
  const pageCount = await page.evaluate((selector) => {
    // Extract page count
    return 10;
  }, pageCountSelector);
  await browser.close();
  return parseInt(pageCount, 10);
};

exports.getPageCount = getPageCount;
