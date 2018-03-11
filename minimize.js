const Minimize = require('minimize');

const minimize = new Minimize({
  plugins: [{
    id: 'remove_js_script',
    element(node, next) {
      if (node.type === 'script' && node.attribs &&
        (node.attribs.type === 'text/javascript' || node.attribs.type === undefined)) {
        // eslint-disable-next-line no-param-reassign
        delete node.children;
        // eslint-disable-next-line no-param-reassign
        delete node.attribs;
      }
      next();
    },
  }],
});

module.exports = minimize;
