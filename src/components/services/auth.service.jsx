import { authKey } from "~/app/constants/storageKey";
import { decodedToken } from "~/app/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "~/app/utils/local-storage";


export const storgeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);

  return !!authToken;
};

export const removeUserInfo = (authKey) => {
  return localStorage.removeItem(authKey);
};
