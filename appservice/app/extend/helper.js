const moment = require('moment');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

// 读本地json文件
exports.readfile = async (dirname, filename) => {
  const filePath = path.join(
    __dirname,
    `../public/${dirname}`,
    `${filename}.json`
  );

  const result = await fs.readFile(filePath);

  return JSON.parse(result);
};

// 写入本地json文件
exports.writefile = async (dirname, filename, data) => {
  const filePath = path.join(
    __dirname,
    `../public/${dirname}`,
    `${filename}.json`
  );

  await fs.writeFile(filePath, JSON.stringify(data));
};

// 密码加密
exports.md5 = str => {
  return crypto.createHash('md5').update(str).digest('hex');
};
