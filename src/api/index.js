const axioslib = require("axios");
const { mac_id } = require("../prelogin/generateUniqueValue");

const HOST = "http://localhost:3000";

const axios = axioslib.create({
  baseURL: HOST,
  //超时15秒
  timeout: 15000,
});

const registerMac = async () => {
  try {
    const results = await axios.post(`machine/set_permission`, {
      mac_id,
    });

    return results.data?.result;
  } catch (error) {
    return false;
  }
};

const checkMac = async () => {
  try {
    const results = await axios.get(`machine/get_permission?mac_id=${mac_id}`);

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
    const results = await axios.post(`/hh_app/register_user`, {
      mac_id,
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
    const results = await axios.post(`/hh_app/login`, {
      mac_id,
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
