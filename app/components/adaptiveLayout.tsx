import { NavLink, useLocation } from "react-router";
import miniLogo from "../images/logo_state1.svg";
import logo from "../images/logo.svg";
import { userContext } from "~/context";
import { useContext } from "react";

function AdaptiveLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useContext(userContext);
    const { pathname } = useLocation();
    const isLoginPage = pathname === "/";

    return (
        <>
            <header>
                {isLoginPage ? (
                    <img src={logo} alt="Logo Sportsee" />
                ) : (
                    <nav>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/profile">Mon profil</NavLink>
                        <button onClick={logout}>Se déconnecter</button>
                    </nav>
                )}
            </header>
            <main>
                {children}
            </main>
            {!isLoginPage && (
                <footer>
                    <div>©Sportsee Tous droits réservés</div>
                    <div>
                        <a href="#">Mentions légales</a>
                        <a href="#">Contact</a>
                        <img src={miniLogo} alt="Logo Sportsee" />
                    </div>
                </footer>
            )}
        </>
    );
}

export default AdaptiveLayout;