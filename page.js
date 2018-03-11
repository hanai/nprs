const genericPool = require('generic-pool');
const devices = require('puppeteer/DeviceDescriptors');

const device = devices['iPhone 6'];

const createPagePool = (browserPromise) => {
  const factory = {
    async create() {
      const browser = await browserPromise;
      const page = await browser.newPage();
      await page.emulate(device);
      return page;
    },
    async destroy(page) {
      return page.close();
    },
  };

  const opts = {
    max: 4,
    min: 2,
  };

  const pool = genericPool.createPool(factory, opts);
  return pool;
};

module.exports = {
  createPagePool,
};
