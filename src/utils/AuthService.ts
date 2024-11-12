import Cookies from "js-cookie";

type TUserSession = {
  rememberme: boolean;
  isModerator: boolean;
  jwt: string; // JWT token
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

// Save JWT and user into cookies with expiry (30 days if remember me is checked)
export const setUserSession = ({ rememberme, jwt, user, isModerator }: TUserSession) => {
  Cookies.set("user", JSON.stringify(user), { expires: rememberme ? 30 : 1 });
  Cookies.set("jwt", jwt, { expires: rememberme ? 30 : 1 });
  Cookies.set("rememberme", String(rememberme), { expires: rememberme ? 30 : 1 });
  Cookies.set('isModerator', String(isModerator), { expires: rememberme ? 7 : undefined });
  return true;
};

// Clear user session from cookies
export const deleteUserSession = () => {
  Cookies.remove("user");
  Cookies.remove("jwt");
  Cookies.remove("rememberme");
  Cookies.remove("isModerator");
  return true;
};

// Retrieve user data from cookies
export const getUser = () => {
  const userStr = Cookies.get("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Retrieve JWT token from cookies
export const getToken = () => {
  return Cookies.get("jwt") || null;
};

// Update JWT token in cookies
export const setToken = (jwt: string, expires: number) => {
  Cookies.set("jwt", jwt, { expires });
};

// Remove JWT token and user from cookies
export const removeUserSession = () => {
  Cookies.remove("jwt");
  Cookies.remove("user");
  Cookies.remove("rememberme");
};

// Get remember me value from cookies
export const getRememberMe = () => Cookies.get("rememberme") || null;

// Set a toast message in cookies with a 1-day expiry
export const setToast = (isToast: any) => {
  Cookies.set("toast", JSON.stringify(isToast), { expires: 1 });
};

// Retrieve the toast message from cookies
export const getToast = () => {
  const toast = Cookies.get("toast");
  return toast ? JSON.parse(toast) : null;
};

// Remove the toast message from cookies
export const removeToast = () => {
  Cookies.remove("toast");
};