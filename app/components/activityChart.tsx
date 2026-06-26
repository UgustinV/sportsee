import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import type { ActivitySession } from "~/types";

function getISOWeek(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function groupByWeek(sessions: ActivitySession[]) {
    const weekMap = new Map<number, { distance: number; sampleDate: Date }>();
    for (const session of sessions) {
        const date = new Date(session.date);
        const week = getISOWeek(date);
        const existing = weekMap.get(week);
        weekMap.set(week, {
            distance: (existing?.distance ?? 0) + session.distance,
            sampleDate: existing?.sampleDate ?? date,
        });
    }
    return Array.from(weekMap.entries())
        .sort(([a], [b]) => a - b)
        .slice(0, 4)
        .map(([, { distance, sampleDate }], index) => {
            const dayOfWeek = sampleDate.getUTCDay() || 7; // 1=Mon … 7=Sun
            const firstDay = new Date(Date.UTC(
                sampleDate.getUTCFullYear(),
                sampleDate.getUTCMonth(),
                sampleDate.getUTCDate() - (dayOfWeek - 1)
            ));
            const lastDay = new Date(Date.UTC(
                firstDay.getUTCFullYear(),
                firstDay.getUTCMonth(),
                firstDay.getUTCDate() + 6
            ));
            return {
                week: `S${index + 1}`,
                distance,
                firstDay: firstDay.toLocaleDateString("fr-FR", { day: "numeric", month: "numeric" }),
                lastDay: lastDay.toLocaleDateString("fr-FR", { day: "numeric", month: "numeric" }),
            };
        });
}

export default function ActivityChart({ activity }: { activity: ActivitySession[] }) {
    const data = groupByWeek(activity);
    console.log(data);
    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip
                separator=""
                labelFormatter={() => ""}
                formatter={(value: number, _name: unknown, props: any) => [
                        <div className="text-[#E8E8E8]">
                            <p className="text-xs">
                                {props.payload.firstDay} au {props.payload.lastDay}
                            </p>
                            <p className="text-base">
                                {(value as number).toFixed(1)} km
                            </p>
                        </div>,
                    ""
                ]}
                animationDuration={300}
                animationEasing="ease-in-out"
                contentStyle={{ backgroundColor: "#0F0F0F", borderRadius: "10px", color: "#fff" }}
            />
            <Bar
                dataKey="distance"
                fill="#B6BDFC"
                name="Distance (km)"
                radius={30}
                barSize={14}
                activeBar={{ fill: "#0B23F4" }}
            />
        </BarChart>
    );
}