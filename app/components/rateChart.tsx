import { Bar, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import type { ActivitySession } from "~/types";
import { useState } from "react";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];


function getCompleteWeekData(sessions: ActivitySession[], monday: Date) {
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
                max: session?.heartRate.max ?? null,
            },
        };
    });
}

export default function RateChart({ activity, monday }: { activity: ActivitySession[], monday: Date }) {
    const [lineHovered, setLineHovered] = useState(false);
    const data = getCompleteWeekData(activity, monday);
    console.log("RateChart data:", data); // Debugging line to check the data being passed to the chart
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} onMouseEnter={() => setLineHovered(true)} onMouseLeave={() => setLineHovered(false)}>
                <XAxis dataKey="day" tickLine={false} />
                <YAxis tickLine={false} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#F1F1F1" />
                <Bar dataKey="heartRate.min" name="Min BPM" fill="#FCC1B6" radius={30} barSize={14} />
                <Bar dataKey="heartRate.max" name="Max BPM" fill="#F4320B" radius={30} barSize={14} />
                <Line
                    dataKey="heartRate.average"
                    name="BPM Moyen"
                    stroke={lineHovered ? "#0B23F4" : "#F2F3FF"}
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#0B23F4", stroke: "#FFFFFF", strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                    type="monotone"
                    connectNulls
                />
                <Legend align="left" iconType="circle" formatter={(value) => <span style={{ color: '#707070', verticalAlign: 'middle' }}>{value}</span>}/>
            </ComposedChart>
        </ResponsiveContainer>
    );
}