import { useUserInfo } from "../hooks/userHook";
import { useActivity } from "../hooks/activityHook";

export function Profile() {
  const { user, loading: userLoading } = useUserInfo("user456");
  const { activity, loading: activityLoading } = useActivity(
    "2025-05-18",
    "2025-05-29"
  );

  if (userLoading || activityLoading) {
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
        <h2>Activité récente</h2>
        <ul>
          {activity.map((session) => (
            <li key={session.date}>
              {session.date} — {session.distance} km — {session.duration} min —{" "}
              {session.caloriesBurned} kcal
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}