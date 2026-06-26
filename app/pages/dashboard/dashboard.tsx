import { useActivity } from "~/hooks/activityHook";
import { userContext } from "~/context";
import { useContext } from "react";
import ActivityChart from "~/components/activityChart";
import RateChart from "~/components/rateChart";
import ActivityCard from "~/components/activityCard";

export function Dashboard() {
    const currentDate = new Date();
    const pastWeek = new Date(currentDate.getTime() - 28 * 24 * 60 * 60 * 1000);
    const { user } = useContext(userContext);
    const { activity, loading: activityLoading } = useActivity(
        pastWeek.toISOString().substring(0, 10),
        currentDate.toISOString().substring(0, 10)
    );
    if (activityLoading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <div>Utilisateur introuvable.</div>;
    }
    const formatter = new Intl.DateTimeFormat('fr', { month: 'long' });
    const registrationDate = new Date(user.createdAt);
    return (
        <div>
            <section>
                <img src={user.profilePicture} alt="Avatar" width={100} height={100} />
                <h1>{user.firstName} {user.lastName}</h1>
                <p>Membre depuis le {registrationDate.getDate()} {formatter.format(registrationDate)} {registrationDate.getFullYear()}</p>
                <p>Distance totale parcourue </p>
                <ActivityCard activity="" value={user.totalDistance} unit="km"/>
            </section>
            <section>
                <h2>Vos dernières performances</h2>
                <ActivityChart activity={activity.map(session => ({ ...session, distance: session.distance }))} />
                <RateChart activity={activity.map(session => ({ ...session, heartRate: session.heartRate }))} />
            </section>
        </div>
    );
}