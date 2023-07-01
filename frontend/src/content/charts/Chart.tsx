import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type dataKey = {
    color: string;
    key: string;
};

type props = {
    readonly title: string;
    readonly data: object[];
    readonly xKey: string;
    readonly dataKeys: dataKey[];
};

export function Chart(
    { title, data, xKey, dataKeys }: props,
) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <defs>
                    {dataKeys.map(({ key, color }) => (
                        <linearGradient
                            id={`color${key}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="10%"
                                stopColor={color}
                                stopOpacity={0.6}
                            />
                            <stop
                                offset="95%"
                                stopColor={color}
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    ))}
                </defs>
                {dataKeys.map(({ key, color }) => (
                    <Area
                        type="monotone"
                        stackId=""
                        dataKey={key}
                        stroke={color}
                        fill={`url(#color${key})`}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}
