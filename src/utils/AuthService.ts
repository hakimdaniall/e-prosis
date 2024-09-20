import Cookies from "js-cookie";

type TToken = {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
};

type TUserSession = {
  rememberme: boolean;
  token: TToken;
  user: string;
};

// save the token and user into the cookies and expired in 30 days
export const setUserSession = ({ rememberme, token, user }: TUserSession) => {
  Cookies.set("user", JSON.stringify(user), { expires: 30 });
  console.log("token:", token.access);
  if (rememberme === true) {
    Cookies.set("token", JSON.stringify(token), { expires: 30 });
    Cookies.set("user", JSON.stringify(user), { expires: 30 });
  } else if (rememberme === false) {
    Cookies.set("token", JSON.stringify(token), { expires: 1 });
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  }
  return true;
};

export const deleteUserSession = () => {
  Cookies.remove("user");
  return true;
};

// return the user data from the cookies
export const getUser = () => {
  const userStr = Cookies.get("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

interface Token {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

// return the token from the cookies
export const getToken = (): Token | null => {
  const token = Cookies.get("token");
  return token ? JSON.parse(token) : null;
};

// remove the token and user from the cookies
export const removeUserSession = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("rememberme");
};

// return the remember me value from the cookies
export const getRememberMe = () => Cookies.get("rememberme") || null;

// update and save the token into the cookies
export const setToken = (token: Token, expires: number) => {
  console.log("strig token: ", JSON.stringify(token));
  Cookies.set("token", JSON.stringify(token), { expires });
};

export const setToast = (isToast: any) => {
  Cookies.set("toast", JSON.stringify(isToast), { expires: 1 });
};

export const getToast = () => Cookies.get("toast") || null;

export const removeToast = () => {
  Cookies.remove("toast");
};
