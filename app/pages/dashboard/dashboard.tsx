import { useActivity } from "~/hooks/activityHook";
import { userContext } from "~/context";
import { useContext, useState } from "react";
import ActivityChart from "~/components/activityChart";
import RateChart from "~/components/rateChart";
import CamembertChart from "~/components/camembert";
import finish from "~/images/finish.svg";

function addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() + days);
    return d;
}

function toISO(date: Date): string {
    return date.toISOString().substring(0, 10);
}

export function Dashboard() {
    const today = new Date();
    const { user } = useContext(userContext);

    const [monthOffset, setMonthOffset] = useState(0);
    const [weekOffset, setWeekOffset] = useState(0);

    const monthEnd   = addDays(today, -monthOffset * 28);
    const monthStart = addDays(monthEnd, -28);

    const todayDow   = today.getUTCDay() || 7;
    const thisMonday = addDays(today, -(todayDow - 1));
    const weekStart  = addDays(thisMonday, -weekOffset * 7);
    const weekEnd    = addDays(weekStart, 6);

    const { activity: activityMonth, loading: loadingMonth } = useActivity(toISO(monthStart), toISO(monthEnd));
    const { activity: activityWeek,  loading: loadingWeek  } = useActivity(toISO(weekStart),  toISO(weekEnd));
    const { activity: activityCurrentWeek, loading: loadingCurrentWeek } = useActivity(toISO(thisMonday), toISO(addDays(thisMonday, 6)));

    if (loadingMonth || loadingWeek || loadingCurrentWeek) return <div>Chargement...</div>;
    if (!user) return <div>Utilisateur introuvable.</div>;

    const formatter = new Intl.DateTimeFormat("fr", { month: "long" });
    const registrationDate = new Date(user.createdAt);
    const averageDistance = activityMonth.length
        ? activityMonth.reduce((sum, d) => sum + d.distance, 0) / activityMonth.length
        : 0;
    const averageHR = activityWeek.length
        ? activityWeek.reduce((sum, d) => sum + (d.heartRate.average ?? 0), 0) / activityWeek.length
        : 0;

    const fmt = (d: Date) => `${d.getUTCDate()} ${formatter.format(d)}`;
    const objectif = 6;

    return (
        <div className="flex flex-col w-full gap-14 px-36 mt-18">
            <section className="flex flex-row bg-linear-to-b from-white rounded-xl py-8 px-12 items-center justify-between mb-27">
                <div className="flex flex-row gap-6 rounded-xl items-center">
                    <img src={user.profilePicture} alt="Avatar" className="w-28 h-32 rounded-xl object-cover" />
                    <div className="flex flex-col h-full justify-center">
                        <h1 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h1>
                        <p>Membre depuis le {registrationDate.getDate()} {formatter.format(registrationDate)} {registrationDate.getFullYear()}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 rounded-xl items-center">
                    <p className="text-[#707070] text-lg">Distance totale parcourue</p>
                    <div className="bg-[#0B23F4] text-white rounded-[10px] px-7 py-6 flex flex-row items-center justify-center">
                        <img src={finish} alt="Finish" className="w-8 mr-2" />
                        <span className="text-[22px]">{user.totalDistance} km</span>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="text-2xl font-semibold">Vos dernières performances</h2>
                <div className="flex flex-row gap-8">
                    <div className="bg-white rounded-xl p-7 w-2/5">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <h3 className="text-2xl font-semibold mb-2 text-[#0B23F4]">{averageDistance.toFixed(1)}km en moyenne</h3>
                            <div className="flex flex-row gap-4 items-center mb-2">
                                <button
                                    className="text-black border border-[#717171] rounded-[10px] px-2.5 py-1 cursor-pointer"
                                    onClick={() => setMonthOffset(o => o + 1)}
                                >{"<"}</button>
                                <p>{fmt(monthStart)} – {fmt(monthEnd)}</p>
                                <button
                                    className="text-black border border-[#717171] rounded-[10px] px-2.5 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                    onClick={() => setMonthOffset(o => o - 1)}
                                    disabled={monthOffset === 0}
                                >{">"}</button>
                            </div>
                        </div>
                        <p className="text-[#707070] text-sm mb-10">Total des kilomètres 4 dernières semaines</p>
                        <ActivityChart activity={activityMonth} />
                    </div>

                    <div className="bg-white rounded-xl p-7 w-3/5">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <h3 className="text-2xl font-semibold mb-2 text-[#F4320B]">{averageHR.toFixed(0)} BPM</h3>
                            <div className="flex flex-row gap-4 items-center mb-2">
                                <button
                                    className="text-black border border-[#717171] rounded-[10px] px-2.5 py-1 cursor-pointer"
                                    onClick={() => setWeekOffset(o => o + 1)}
                                >{"<"}</button>
                                <p>{fmt(weekStart)} – {fmt(weekEnd)}</p>
                                <button
                                    className="text-black border border-[#717171] rounded-[10px] px-2.5 py-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    onClick={() => setWeekOffset(o => o - 1)}
                                    disabled={weekOffset === 0}
                                >{">"}</button>
                            </div>
                        </div>
                        <p className="text-[#707070] text-sm mb-10">Fréquence cardiaque moyenne</p>
                        <RateChart activity={activityWeek} monday={weekStart} />
                    </div>

                </div>
            </section>
            <section>
                <h2 className="text-2xl font-semibold">Cette semaine</h2>
                <h3 className="text-lg text-[#707070] font-medium">du {thisMonday.getUTCDate()}/{thisMonday.getUTCMonth() + 1}/{thisMonday.getUTCFullYear()} au {addDays(thisMonday, 6).getUTCDate()}/{addDays(thisMonday, 6).getUTCMonth() + 1}/{addDays(thisMonday, 6).getUTCFullYear()}</h3>
                <div className="flex flex-row gap-8 mt-10 mb-24">
                    <div className="bg-white rounded-xl p-7 w-2/5">
                        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
                            <p className="text-3xl text-[#0B23F4]">x{activityCurrentWeek.length}</p>
                            <p className="text-[#B6BDFC] text-[16px]">sur objectif de {objectif}</p>
                        </div>
                        <p className="text-[#707070] text-sm mb-10">Courses hebdomadaire réalisées</p>
                        <CamembertChart activity={activityCurrentWeek} objectif={objectif} />
                    </div>
                    <div className="flex flex-col gap-8 w-3/5">
                        <div className="flex flex-col justify-center items-start px-6 py-8 bg-white rounded-xl">
                            <h4 className="text-sm">Durée d'activité</h4>
                            <div className="flex flex-row items-baseline gap-2">
                                <p className="text-2xl text-[#0B23F4]">{activityCurrentWeek.reduce((acc, session) => acc + session.duration, 0)}</p>
                                <p className="text-[16px] text-[#B6BDFC]">minutes</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start px-6 py-8 bg-white rounded-xl">
                            <h4 className="text-sm">Distance</h4>
                            <div className="flex flex-row items-baseline gap-2">
                                <p className="text-[#F4320B] text-2xl">{activityCurrentWeek.reduce((acc, session) => acc + session.distance, 0)}</p>
                                <p className="text-[16px] text-[#FCC1B6]">km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}