import { mockLoginResponse, mockUser, normalizeUser, mockUserInfoResponse } from "../data/mockData";
import type { User } from "../types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const BACKEND = import.meta.env.VITE_SERVER_URL;

export async function login(
  username: string,
  password: string
): Promise<{ token: string; userId: string } | null> {
  if (USE_MOCK) {
    return mockLoginResponse;
  }

  const response = await fetch(`${BACKEND}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) return null;
  return response.json();
}

export async function fetchUserInfo(
  userId: string,
  token: string
): Promise<User | null> {
  if (USE_MOCK) {
    return normalizeUser(userId, mockUserInfoResponse);
  }

  const response = await fetch(`${BACKEND}/api/user-info`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;
  const data = await response.json();
  return normalizeUser(userId, data);
}