import { useActivity } from "~/hooks/activityHook";
import { userContext } from "~/context";
import { useContext } from "react";
import ActivityChart from "~/components/chart";

export function Profile() {
    const currentDate = new Date();
    const pastWeek = new Date(currentDate.getTime() - 28 * 24 * 60 * 60 * 1000);
    const { user } = useContext(userContext);
    const { activity, loading: activityLoading } = useActivity(
        pastWeek.toISOString().substring(0, 10),
        currentDate.toISOString().substring(0, 10)
    );
    console.log(activity);
    if (activityLoading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <div>Utilisateur introuvable.</div>;
    }
    return (
        <div>
            <h1>Bonjour {user.firstName} {user.lastName}</h1>

            <section>
                <h2>Statistiques globales</h2>
                <ul>
                <li>Sessions : {user.totalSessions}</li>
                <li>Distance totale : {user.totalDistance} km</li>
                <li>Durée totale : {user.totalDuration} min</li>
                </ul>
            </section>
            <section>
                <h2>Vos dernières performances</h2>
                <ActivityChart activity={activity} chartType="distance" />
                <ActivityChart activity={activity} chartType="bpm" />
            </section>
        </div>
    );
}