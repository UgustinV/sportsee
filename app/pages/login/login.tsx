import { useState, useContext } from "react";
import { userContext } from "../../context";
import { useNavigate } from "react-router";
import { login, fetchUserInfo } from "../../hooks/loginHook";
import illustration from "../../images/login_illustration.jpg";
import type { User } from "../../types";

interface LoginProps {
  setUser: (u: User | null) => void;
}

export function Login({ setUser }: LoginProps) {
    const [error, setError] = useState<string | null>(null);
    const { user, isLoggedIn, logout } = useContext(userContext);
    console.log("Login component - user:", user, "isLoggedIn:", isLoggedIn);
    const navigate = useNavigate();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const username = form.get("username") as string;
        const password = form.get("password") as string;

        const loginResult = await login(username, password);
        if (!loginResult) {
        setError("Identifiants incorrects.");
        return;
        }

        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("userId", loginResult.userId);

        const user = await fetchUserInfo(loginResult.userId, loginResult.token);
        setUser(user);
        navigate("/profile");
    }

    return (
        <div className="flex flex-row">
        <div className="flex flex-col">
            <h1>Transformez vos stats en résultats</h1>
            <h2>Se connecter</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" className="border" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" className="border" />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="border cursor-pointer">Se connecter</button>
            <a href="#">Mot de passe oublié ?</a>
            </form>
        </div>
        <div className="flex flex-col">
            <img src={illustration} alt="Illustration de connexion Sportsee" />
            <p>Analysez vos performances en un clin d'œil.</p>
        </div>
        </div>
    );
}