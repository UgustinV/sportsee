import { createContext } from "react";
import type { User } from "./types";

interface UserContextValue {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
}

export const userContext = createContext<UserContextValue>({
  user: null,
  isLoggedIn: false,
  logout: () => {},
});