import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import { useEffect, useState } from "react";
import { userContext } from "./context";
import type { User } from "./types";
import AdaptiveLayout from "./components/adaptiveLayout";

import type { Route } from "./+types/root";
import "./app.css";
import { fetchUserInfo } from "./hooks/loginHook";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="bg-[#f2f3ff] h-full">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;
    fetchUserInfo(userId, token).then((restoredUser) => {
      if (restoredUser) setUser(restoredUser);
    });
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  }

  return (
    <userContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      <AdaptiveLayout>
        <Outlet context={{ setUser }} />
      </AdaptiveLayout>
    </userContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oups!";
    let details = "Une erreur inattendue est survenue.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : error.status === 401 ? "401" : "Erreur";
        details = error.status === 404 ? "La page demandée est introuvable." : error.status === 401 ? "Non autorisé" : error.statusText || details;
    } else if (error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        <a href="/" className="text-blue-500 underline">Retour à l'accueil</a>.
        {stack && (
            <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
            </pre>
        )}
        </main>
    );
}
