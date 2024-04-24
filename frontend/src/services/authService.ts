import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import { User } from "../types/index";

const tokenKey = process.env.REACT_APP_TOKEN_KEY as string;

function loginWithJwt(jwt: string): void {
  localStorage.setItem(tokenKey, jwt);
}

function rememberMe(jwt: string): void {
  Cookies.set(tokenKey, jwt);
}

function logout(): void {
  localStorage.removeItem(tokenKey);
  Cookies.remove(tokenKey);
}

function getCurrentUser(): User | null {
  try {
    const jwt = localStorage.getItem(tokenKey) || Cookies.get(tokenKey);
    return jwtDecode<User>(jwt ?? '')
  } catch (ex) {
    return null;
  }
}

function getJwt(): string | undefined {
  return localStorage.getItem(tokenKey) || Cookies.get(tokenKey);
}

const auth = {
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  rememberMe,
};

export default auth;
