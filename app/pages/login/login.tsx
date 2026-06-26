import { useState } from "react";
import { useNavigate } from "react-router";
import { login, fetchUserInfo } from "~/hooks/loginHook";
import illustration from "~/images/login_illustration.jpg";
import type { User } from "~/types";
import logo from "~/images/logo.svg";

interface LoginProps {
  setUser: (u: User | null) => void;
}

export function Login({ setUser }: LoginProps) {
    const [error, setError] = useState<string | null>(null);
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
        navigate("/dashboard");
    }

    return (
        <div className="flex flex-row justify-between items-center h-screen">
            <div className="flex flex-col w-1/3 h-full pl-24 pt-14">
                <div className="flex w-full justify-start items-center">
                    <img src={logo} alt="Logo Sportsee" className="w-39.25" />
                </div>
                <div className="flex flex-col justify-center items-start w-96 h-full">
                    <div className="flex flex-col justify-center items-start w-full  bg-white rounded-3xl  p-11">
                        <h1 className="text-3xl font-bold mb-12 text-[#0B23F4]">Transformez vos stats en résultats</h1>
                        <h2 className="text-2xl font-semibold mb-6">Se connecter</h2>
                        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                            <label htmlFor="username" className="text-sm text-[#707070] mb-1">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" className="border border-[#717171] rounded-xl h-14 mb-6 px-3.5 bg-white" />
                            <label htmlFor="password" className="text-sm text-[#707070] mb-1">Mot de passe</label>
                            <input type="password" id="password" name="password" className="border border-[#717171] rounded-xl h-14 mb-10 px-3.5 bg-white" />
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="bg-[#0B23F4] text-white rounded-[10px] p-4 mb-10 shadow-md flex flex-col items-center justify-center cursor-pointer">Se connecter</button>
                            <a href="#" className="text-sm">Mot de passe oublié ?</a>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-2/3 h-full">
                <img src={illustration} alt="Illustration de connexion Sportsee" className="w-full h-full object-cover" />
                <p className="absolute bottom-0 right-0 m-6 w-85 text-[#0B23F4] text-[12px] font-bold bg-white p-4 rounded-full text-center">Analysez vos performances en un clin d’œil,suivez vos progrès et atteignez vos objectifs.</p>
            </div>
        </div>
    );
}