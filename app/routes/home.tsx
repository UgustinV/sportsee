import type { Route } from "./+types/home";
import { Login } from "../login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sportsee" },
    { name: "description", content: "Bienvenue sur Sportsee!" },
  ];
}

export default function Home() {
  return <Login />;
}
