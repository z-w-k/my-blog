import crypto from 'crypto';
// 生成 64 字节的随机字符串（512位）
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secret = generateSecret();
console.log('Generated secret:', secret);