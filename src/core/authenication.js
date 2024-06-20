import jwt from "jwt-decode";

const _token = "lsp_session_token";

export const setToken = (token) => localStorage.setItem(_token, token);

export const removeToken = () => localStorage.removeItem(_token);

export const getToken = () => localStorage.getItem(_token);

export const getUser = () => getToken() && jwt(getToken());

export const isAuth = () => {
  const timestamp = new Date();

  if (getToken() && timestamp.getTime() >= getUser().exp * 1000) {
    removeToken();
    return false;
  }

  return getToken() != null;
};
