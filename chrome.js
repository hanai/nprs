const rq = require('request-promise-native');

const { CHROME_URL } = process.env;

const getVersion = () => (rq.get(`${CHROME_URL}/json/version`)
  .then((res) => {
    const version = JSON.parse(res);
    return version;
  }));

const getWSDebuggerUrl = async () => {
  const version = await getVersion();
  const wsDebuggerUrl = version.webSocketDebuggerUrl;
  return wsDebuggerUrl;
};

module.exports = {
  getWSDebuggerUrl,
};
