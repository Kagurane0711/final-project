import axios from "axios";
import { API_BASE_URL } from "./services/api";

export const LOCALSTORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expireTime: "expireTime",
  timestamp: "tokenTimestamp",
};

export const getStoredToken = () => {
  const token = window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken);
  if (!token || token === "undefined" || token === "null") {
    return null;
  }
  return token;
};

export const hasTokenExpired = () => {
  const token = getStoredToken();
  const timestamp = window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp);
  const expireTime = window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime);

  if (!token || !timestamp || !expireTime) {
    return false;
  }

  const secondsElapsed = (Date.now() - Number(timestamp)) / 1000;
  return secondsElapsed > Number(expireTime);
};

export const refreshToken = async () => {
  const storedRefreshToken = window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken);
  if (!storedRefreshToken || storedRefreshToken === "undefined" || storedRefreshToken === "null") {
    console.error("No refresh token available");
    logout();
    return null;
  }

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/auth/token/renew?refresh_token=${encodeURIComponent(storedRefreshToken)}`
    );

    if (data?.access_token) {
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
      if (data.expires_in) {
        window.localStorage.setItem(LOCALSTORAGE_KEYS.expireTime, data.expires_in.toString());
      }
      return data.access_token;
    }
  } catch (e) {
    console.error("Failed to refresh token", e);
    logout();
  }
  return null;
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const urlAccessToken = urlParams.get("access_token");
  const urlRefreshToken = urlParams.get("refresh_token");
  const urlExpiresIn = urlParams.get("expires_in");
  const hasError = urlParams.get("error");

  if (urlAccessToken) {
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, urlAccessToken);
    if (urlRefreshToken) {
      window.localStorage.setItem(LOCALSTORAGE_KEYS.refreshToken, urlRefreshToken);
    }
    if (urlExpiresIn) {
      window.localStorage.setItem(LOCALSTORAGE_KEYS.expireTime, urlExpiresIn);
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());

    // Clean up query parameters from URL without full reload
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    return urlAccessToken;
  }

  if (hasError || hasTokenExpired()) {
    refreshToken();
  }

  return getStoredToken();
};

export const logout = () => {
  Object.values(LOCALSTORAGE_KEYS).forEach((key) => {
    window.localStorage.removeItem(key);
  });
  window.location.href = window.location.origin;
};

export const isAuthenticated = () => {
  return Boolean(getStoredToken());
};

// Backwards compatibility getter export
export const accessToken = getStoredToken();

