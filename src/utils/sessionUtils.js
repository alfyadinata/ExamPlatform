const getToken = () => localStorage.getItem("token");

const isAuthenticated = () => {
  if (getToken()) return true;
  return false;
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const clear = () => {
  localStorage.clear();
};

const getUser = () => JSON.parse(localStorage.getItem("user"));

export default {
  setToken,
  getToken,
  getUser,
  isAuthenticated,
  clear,
};
