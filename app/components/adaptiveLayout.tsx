import { NavLink, useLocation } from "react-router";
import miniLogo from "~/images/logo_state1.svg";
import { userContext } from "~/context";
import { useContext } from "react";
import logo from "~/images/logo.svg";

function AdaptiveLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useContext(userContext);
    const { pathname } = useLocation();
    const isLoginPage = pathname === "/";

    return (
        <div className="flex flex-col min-h-full">
            {!isLoginPage && (
                <header className="flex justify-between items-center p-9 bg-[#F2F3FF]">
                    <img src={logo} alt="Logo Sportsee" className="w-39.25" />
                    <nav className="flex justify-between items-center p-4 bg-white rounded-full px-5">
                        <NavLink to="/dashboard" className="px-5">Dashboard</NavLink>
                        <NavLink to="/profile" className="px-5 border-r border-[#0B23F4]">Mon profil</NavLink>
                        <button onClick={logout} className="px-5 cursor-pointer">Se déconnecter</button>
                    </nav>
                </header>
            )}
            <main className="flex-1">
                {children}
            </main>
            {!isLoginPage && (
                <footer className="flex justify-between items-center py-2.5 px-24 bg-white">
                    <p>©Sportsee Tous droits réservés</p>
                    <div className="flex justify-between items-center gap-4">
                        <a href="#">Mentions légales</a>
                        <a href="#" className="mr-4">Contact</a>
                        <img src={miniLogo} alt="Logo Sportsee" />
                    </div>
                </footer>
            )}
        </div>
    );
}

export default AdaptiveLayout;