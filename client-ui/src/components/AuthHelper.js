import axios from "../instance";

export const verifyToken = async (idToken, disabled) => {
  const data = {
    idToken,
    disabled,
  };
  try {
    const res = await axios.post("/admin/verifyToken", data);
    return res.data.verifiedToken;
  } catch (error) {
    return error.response.data.verifiedToken;
  }
};

export const getListUsers = async (user = {}) => {
  const data = {
    verified: user.verified,
    access: user.data.access.find((access) => access.type === "users"),
  };
  try {
    const res = await axios.post("/admin/getListUsers", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const generateToken = async (uId, additionalClaims) => {
  const data = {
    uId,
    additionalClaims,
  };
  try {
    const res = await axios.post("/admin/generateToken", data);
    return res.data.token;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLevels = async (user = {}) => {
  const data = {
    verified: user.verified,
    access: user.data.access.find((access) => access.type === "users"),
  };
  try {
    const res = await axios.post("/admin/getAllLevels", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
