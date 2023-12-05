const os = require("os");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const userHomeDir = require("os").homedir();

const adminPassword = "ef40fd3e6d2a";

const SecretKey = "chaojidashadiao";

const CONFIG_PATH = "paymenttoolconfig.txt";

let config = {
  mac: "",
  userinfo: {},
};

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

const initialConfig = (conf) => {
  fs.writeFileSync(path.join(userHomeDir, CONFIG_PATH), conf, "utf8");
};

const loadConfig = async () => {
  try {
    if (fs.existsSync(path.join(userHomeDir, CONFIG_PATH))) {
      const localConfig = fs.readFileSync(
        path.join(userHomeDir, CONFIG_PATH),
        "utf8"
      );
      const { mac, userinfo } = JSON.parse(localConfig);

      if (!mac) {
        return false;
      }

      config.mac = mac;
      config.userinfo = userinfo;
    } else {
      initialConfig(JSON.stringify(config));
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const validateAdminPassword = (password) => {
  return password === adminPassword;
};

const registerMac = async (password) => {
  const pass = validateAdminPassword(password);

  if (!pass) {
    return false;
  }

  try {
    const mac = generateUniqueValue();
    config.mac = mac;
    fs.writeFileSync(
      path.join(userHomeDir, CONFIG_PATH),
      JSON.stringify(config),
      "utf8"
    );

    return true;
  } catch (error) {
    return false;
  }
};

const registerUser = (username, password) => {
  try {
    const key = crypto
      .createHash("md5")
      .update(username + SecretKey)
      .digest("hex");
    const value = crypto
      .createHash("md5")
      .update(password + SecretKey)
      .digest("hex");

    if (config.userinfo[key]) {
      return false;
    }

    config.userinfo[key] = value;
    fs.writeFileSync(
      path.join(userHomeDir, CONFIG_PATH),
      JSON.stringify(config),
      "utf8"
    );

    return true;
  } catch (error) {
    return false;
  }
};

const loginUser = (username, password) => {
  try {
    const key = crypto
      .createHash("md5")
      .update(username + SecretKey)
      .digest("hex");
    const value = crypto
      .createHash("md5")
      .update(password + SecretKey)
      .digest("hex");

    return config?.userinfo[key] === value;
  } catch (error) {
    return false;
  }
};

const macAllow = async () => {
  try {
    const uniqueValue = generateUniqueValue();

    if (!config.mac) {
      return false;
    }

    return config.mac === uniqueValue;
  } catch (error) {
    return false;
  }
};

module.exports = {
  macAllow,
  loadConfig,
  loginUser,
  registerMac,
  registerUser,
  validateAdminPassword,
};
