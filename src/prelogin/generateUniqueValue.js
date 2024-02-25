const os = require("os");
const crypto = require("crypto");
const fs = require("fs");

const axioslib = require("axios");

const HOST = "http://localhost:3000";

const axios = axioslib.create({
  baseURL: HOST,
  //超时15秒
  timeout: 15000,
});

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

const registerMac = async () => {
  try {
    const results = await axios.get(`/register_machine?mac_id=${mac_id}`);

    return results.data?.result;
  } catch (error) {
    return false;
  }
};
const checkMac = async () => {
  try {
    const results = await axios.get(`/check_machine?mac_id=${mac_id}`);

    return {
      register: results.data?.result === "success",
      mac_id: mac_id.slice(0, 10),
    };
  } catch (error) {
    return {
      register: false,
      mac_id: mac_id.slice(0, 10),
    };
  }
};

const registerUser = async (username, password) => {
  try {
    const results = await axios.post(`/register_user`, {
      username,
      password,
    });
    return {
      register: results.data?.result === "success",
      message: results.data?.message ?? "",
    };
  } catch (error) {
    return {
      register: false,
      message: "unknown error",
    };
  }
};

const loginUser = async (username, password) => {
  try {
    const results = await axios.post(`${HOST}/login`, {
      username,
      password,
    });
    return results.data?.result === "success";
  } catch (error) {
    return false;
  }
};

module.exports = {
  loginUser,
  checkMac,
  registerMac,
  registerUser,
};
