import { Bar, BarChart, XAxis, YAxis } from "recharts";
import type { ActivitySession } from "~/types";

export default function ActivityChart({ activity, chartType }: { activity: ActivitySession[], chartType: "distance" | "bpm" }) {
    return (
        <BarChart width={600} height={300} data={activity}>
            <XAxis dataKey="date" />
            <YAxis />
            {chartType === "distance" && <Bar dataKey="distance" fill="#8884d8" name="Distance (km)" />}
            {chartType === "bpm" && <Bar dataKey="heartRate.average" fill="#82ca9d" name="Fréquence cardiaque (bpm)" />}
        </BarChart>
    );
}