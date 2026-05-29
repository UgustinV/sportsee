import type { Route } from "./+types/home";
import { useOutletContext } from "react-router";
import { Login } from "../login/login";
import type { User } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sportsee" },
    { name: "description", content: "Bienvenue sur Sportsee!" },
  ];
}

export default function Home() {
  const { setUser } = useOutletContext<{ setUser: (u: User | null) => void }>();
  return <Login setUser={setUser} />;
}
