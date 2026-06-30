import { useState } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
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

function AnimatedBar(props: any) {
    const [hovered, setHovered] = useState(false);
    const { x, y, width, height } = props;
    return (
        <rect
            x={x} y={y} width={width} height={height}
            rx={7}
            fill={hovered ? "#0B23F4" : "#B6BDFC"}
            style={{ transition: "fill 0.2s ease-in" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        />
    );
}

export default function ActivityChart({ activity }: { activity: ActivitySession[] }) {
    const data = groupByWeek(activity);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="week" tickLine={false} />
                <YAxis tickLine={false} />
                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#F1F1F1" />
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
                    cursor={false}
                />
                <Bar
                    dataKey="distance"
                    name="Km"
                    barSize={14}
                    shape={<AnimatedBar />}
                />
                <Legend align="left" iconType="circle" formatter={(value) => <span style={{ color: '#707070', verticalAlign: 'middle' }}>{value}</span>} />
            </BarChart>
        </ResponsiveContainer>
    );
}