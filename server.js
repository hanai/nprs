const http = require('http');

const browser = require('./browser');
const minimize = require('./minimize');
const store = require('./store');

const useCache = process.env.NODE_ENV === 'production';

const server = http.createServer(async (req, res) => {
  const {
    url,
  } = req;

  // console.log(req.headers);

  let html = await store.getVal(url);

  if (useCache && html !== null) {
    res.end(html);
  } else {
    html = await browser.goto(url);

    html = minimize.parse(html);

    store.setVal(url, html);
    res.end(html);
  }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);
