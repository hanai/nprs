const puppeteer = require('puppeteer');
const { getWSDebuggerUrl } = require('./chrome');

const {
  createPagePool,
} = require('./page');

const { HOST, PROTOCOL, PORT } = process.env;

const browserPromise = getWSDebuggerUrl.then((url) => {
  return puppeteer.connect({
    browserWSEndpoint: url,
    ignoreHTTPSErrors: true,
  })
    .catch((err) => {
      console.log(err);
    });
});

const pagePool = createPagePool(browserPromise);

const goto = async (path) => {
  const url = `${PROTOCOL}://${HOST}:${PORT}${path}`;
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

  await pagePool.drain().then(() => {
    pagePool.clear();
  });

  browser.close();
};

module.exports = {
  goto,
  closeBrowser,
};
