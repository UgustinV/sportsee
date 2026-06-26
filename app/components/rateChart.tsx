import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import type { ActivitySession } from "~/types";


const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

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
            heartRate: {
                average: session?.heartRate.average ?? null,
                min: session?.heartRate.min ?? null,
                max: session?.heartRate.max ?? null },
        };
    });
}

export default function RateChart({ activity }: { activity: ActivitySession[] }) {
    const data = getCompleteWeekData(activity);
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
        >
            <XAxis dataKey="day" />
            <YAxis />
            <Bar
                dataKey="heartRate.min"
                fill="#FCC1B6"
                radius={30}
                barSize={14}
            />
            <Bar
                dataKey="heartRate.max"
                fill="#F4320B"
                radius={30}
                barSize={14}
            />
        </BarChart>
    );
}