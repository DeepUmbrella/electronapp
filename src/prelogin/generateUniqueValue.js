const os = require("os");
const crypto = require("crypto");

const SecretKey = "chaojidashadiao";

function generateUniqueValue() {
  const cpus = os.cpus();

  // 获取每个 CPU 的型号和速度
  const cpuInfo = cpus.map((cpu) => `${cpu.model}-${cpu.speed}`).join(",");

  // 使用MD5哈希生成唯一值
  const uniqueValue = crypto
    .createHash("md5")
    .update(cpuInfo + SecretKey)
    .digest("hex");

  return uniqueValue;
}

const mac_id = generateUniqueValue();

module.exports = { mac_id };
