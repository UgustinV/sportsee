import { useActivity } from "~/hooks/activityHook";
import { userContext } from "~/context";
import { useContext } from "react";
import ActivityCard from "~/components/activityCard";

export function Profile() {
    const currentDate = new Date();
    const { user } = useContext(userContext);
    const { activity, loading: activityLoading } = useActivity(
        user?.createdAt ?? "",
        currentDate.toISOString().substring(0, 10)
    );
    if (!user || activityLoading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <div>Utilisateur introuvable.</div>;
    }
    const formatter = new Intl.DateTimeFormat('fr', { month: 'long' });
    const registrationDate = new Date(user.createdAt);
    const totalDays = Math.floor((currentDate.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
    const restDays = totalDays - activity.length;
    return (
        <div className="flex flex-row w-full justify-between gap-14 px-36">
            <div className="flex flex-col gap-4 w-1/2">
                <section className="flex flex-row gap-6 bg-white rounded-xl p-7 items-center">
                    <img src={user.profilePicture} alt="Avatar" className="w-28 h-32 rounded-xl object-cover" />
                    <div className="flex flex-col h-full justify-center">
                        <h1 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h1>
                        <p>Membre depuis le {registrationDate.getDate()} {formatter.format(registrationDate)} {registrationDate.getFullYear()}</p>
                    </div>
                </section>
                <section id="profile-info" className="flex flex-col bg-white rounded-xl p-7">
                    <h2 className="text-2xl font-semibold pb-6 border-b border-[#E7E7E7]">Votre profil</h2>
                    <ul className="flex flex-col gap-6 mt-8 text-lg text-[#707070]">
                        <li>Âge : {user.age}</li>
                        <li>Genre : {user.gender === "male" ? "Homme" : user.gender === "female" ? "Femme" : "Autre"}</li>
                        <li>Taille : {Math.floor(user.height/100)}m{user.height%100}</li>
                        <li>Poids : {user.weight}kg</li>
                    </ul>
                </section>
            </div>
            <section id="profile-stats" className="w-1/2">
                <h2 className="font-semibold text-2xl">Vos statistiques</h2>
                <p className="mb-8">depuis le {registrationDate.getDate()} {formatter.format(registrationDate)} {registrationDate.getFullYear()}</p>
                <div className="grid grid-cols-2 gap-4">
                    <ActivityCard activity="Temps total couru" value={user.totalDuration} unit="min" isTime />
                    <ActivityCard activity="Calories brûlées" value={activity.reduce((sum, s) => sum + s.caloriesBurned, 0)} unit="kcal"/>
                    <ActivityCard activity="Distance totale parcourue" value={user.totalDistance} unit="km"/>
                    <ActivityCard activity="Nombre de jours de repos" value={restDays} unit="jours"/>
                    <ActivityCard activity="Nombre de sessions" value={user.totalSessions} unit="sessions"/>
                </div>
            </section>
        </div>
    );
}