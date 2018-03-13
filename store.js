const Redis = require('ioredis');

const { REDIS_URL } = process.env;

const redis = new Redis(REDIS_URL);

const EXPIRE = 60 * 60 * 24 * 3;

const getVal = key => redis.get(key);

const setVal = (key, val) => redis.set(key, val, 'EX', EXPIRE);

module.exports = {
  getVal,
  setVal,
};
