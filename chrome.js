const rq = require('request-promise-native');

const getVersion = () => (rq.get('http://chrome:9222/json/version')
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
