import { jwtDecode } from "jwt-decode";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;
  return verifyToken(token);
}

export function verifyToken(token) {
  let verifiedToken = null;

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken) {
      verifiedToken = token;
    }
  } catch (error) {
    console.log("token has been tampered with");
    localStorage.removeItem("token");
  }

  return verifiedToken;
}

export function tokenLoader() {
  return getAuthToken();
}
