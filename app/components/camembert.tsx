import { Cell, Legend, Pie, PieChart } from "recharts";
import type { ActivitySession } from "~/types";

export default function CamembertChart({ activity, objectif }: { activity: ActivitySession[], objectif: number }) {
    const data = [
        { name: "réalisées", value: activity.length, fill: "#B6BDFC" },
        { name: "restantes", value: objectif - activity.length, fill: "#0B23F4" },
    ];
    return (
        <PieChart width={600} height={300}>
            <Pie
                data={data}
                dataKey="value"
                name="Distance (km)"
                radius={30}
                innerRadius={20}
                outerRadius={50}
                label={({ name, value }) => `${value} ${name}`}
            />
            {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
            ))}
            <Legend
                
            />
        </PieChart>
    );
}