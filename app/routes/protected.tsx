import { redirect, Outlet } from "react-router";
import type { Route } from "./+types/protected";

export function clientLoader(_: Route.ClientLoaderArgs) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return null;
}

export default function ProtectedLayout() {
    return <Outlet />;
}