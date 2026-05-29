import { useState, useEffect } from "react";
import type { User } from "../types";
import { mockUser, mockUserInfoResponse, normalizeUser } from "../data/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const BACKEND = import.meta.env.VITE_SERVER_URL;
console.log("Using mock data:", USE_MOCK);

export function useUserInfo(userId: string): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      setUser(mockUser);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Fetching user info for userId:", userId, "with token:", token);
    fetch(`${BACKEND}/api/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(normalizeUser(userId, data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}