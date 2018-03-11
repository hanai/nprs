const puppeteer = require('puppeteer');

const {
  createPagePool,
} = require('./page');

const host = 'm.bilibili.com';
const protocol = 'https';
const port = 443;

const browserPromise = puppeteer.launch({
  headless: true,
});

const pagePool = createPagePool(browserPromise);

const goto = async (path) => {
  const url = `${protocol}://${host}:${port}${path}`;
  const page = await pagePool.acquire();

  return page.goto(url, {
    timeout: 10000,
    waitUntil: ['load', 'networkidle2'],
  })
    .then(async () => {
      const html = await page.content();
      pagePool.destroy(page);
      return html;
    })
    .catch((err) => {
      console.log(err);
    });
};

const closeBrowser = async () => {
  const browser = await browserPromise;
  browser.close();
};

module.exports = {
  goto,
  closeBrowser,
};
