import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token ? verifyToken(token) : null;
}

export function verifyToken(token) {
  let verifiedToken = null;

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      verifiedToken = token;
    }
  } catch (err) {
    console.log(err.message);
    localStorage.removeItem("token");
  }

  return verifiedToken;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  return token ? null : redirect("/login");
}
