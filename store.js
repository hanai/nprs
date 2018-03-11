const Redis = require('ioredis');

const redis = new Redis();

const EXPIRE = 60 * 60 * 24 * 3;

const getVal = key => redis.get(key);

const setVal = (key, val) => redis.set(key, val, 'EX', EXPIRE);

module.exports = {
  getVal,
  setVal,
};
