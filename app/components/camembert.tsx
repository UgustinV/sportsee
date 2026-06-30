import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { ActivitySession } from "~/types";

export default function CamembertChart({ activity, objectif }: { activity: ActivitySession[], objectif: number }) {
    const data = [
        { name: "réalisées", value: activity.length, fill: "#B6BDFC" },
        { name: "restantes", value: objectif - activity.length, fill: "#0B23F4" },
    ];

    const renderLabel = (props: any) => {
    const { x, y, fill, name, value } = props;
    console.log("Label props:", props); // Debugging line to check the props being passed to the label
    return (
        <g>
        <circle
            cx={x - 8}
            cy={y}
            r={4}
            fill={fill}
        />
        <text
            x={x}
            y={y}
            dominantBaseline="middle"
            fill="#333"
            fontSize={14}
        >
            {`${value} ${name}`}
        </text>
        </g>
    );
};
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    name="Distance (km)"
                    radius={30}
                    innerRadius={40}
                    outerRadius={80}
                    label={renderLabel}
                    labelLine={false}
                />
                {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                ))}
            </PieChart>
        </ResponsiveContainer>
    );
}