import { Bar, BarChart, XAxis, YAxis } from "recharts";
import type { ActivitySession } from "~/types";


const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getISOWeek(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function groupByWeek(sessions: ActivitySession[]) {
    const weekMap = new Map<number, number>();
    for (const session of sessions) {
        const week = getISOWeek(new Date(session.date));
        weekMap.set(week, (weekMap.get(week) ?? 0) + session.distance);
    }
    return Array.from(weekMap.entries())
        .sort(([a], [b]) => a - b)
        .slice(0, 4)
        .map(([, distance], index) => ({ week: `S${index + 1}`, distance }));
}

function getCompleteWeekData(sessions: ActivitySession[]) {
    const today = new Date();
    const todayDow = today.getUTCDay() || 7;

    const thisMonday = new Date(today);
    thisMonday.setUTCDate(today.getUTCDate() - (todayDow - 1));
    thisMonday.setUTCHours(0, 0, 0, 0);

    const monday = new Date(thisMonday);
    if (todayDow < 7) {
        monday.setUTCDate(thisMonday.getUTCDate() - 7);
    }

    return DAY_LABELS.map((day, i) => {
        const dayDate = new Date(monday);
        dayDate.setUTCDate(monday.getUTCDate() + i);
        const dateStr = dayDate.toISOString().split("T")[0];
        const session = sessions.find(s => s.date.startsWith(dateStr));
        return {
            day,
            heartRate: { average: session?.heartRate.average ?? null }
        };
    });
}

export default function ActivityChart({ activity, chartType }: { activity: ActivitySession[], chartType: "distance" | "bpm" }) {
    const data = chartType === "distance" ? groupByWeek(activity) : getCompleteWeekData(activity);
    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey={chartType === "distance" ? "week" : "day"} />
            <YAxis />
            {chartType === "distance" && <Bar dataKey="distance" fill="#8884d8" name="Distance (km)" />}
            {chartType === "bpm" && <Bar dataKey="heartRate.average" fill="#82ca9d" name="Fréquence cardiaque (bpm)" />}
        </BarChart>
    );
}