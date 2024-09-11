import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

// This return the time left for token expiry or 0
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) return 0;

  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

// returns null, "EXPIRED" or the token
export function getAuthToken() {
  let token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!verifyToken(token)) {
    return null;
  }

  if (tokenDuration < 1) {
    return "EXPIRED";
  }

  return token;
}

// returns null or the token
export function verifyToken(token) {
  let verifiedToken = null;

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      verifiedToken = token;
    }
  } catch (err) {
    localStorage.removeItem("token");
  }

  return verifiedToken;
}

// A simple helper function to get the token
export function tokenLoader() {
  return getAuthToken();
}

// Checks for the token and redirect if token is not present
export function checkAuthLoader() {
  const token = getAuthToken();
  return token ? null : redirect("/login");
}
