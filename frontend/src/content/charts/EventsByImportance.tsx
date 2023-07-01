import { Chart } from "./Chart";
import { randomColor } from "@/lib/objects/randomColor";

export function EventsByImportance() {
    const data = [
        {
            name: "january",
            high: 2,
            average: 7,
            low: 5,
        },
        {
            name: "february",
            high: 7,
            average: 8,
            low: 4,
        },
        {
            name: "march",
            high: 9,
            average: 8,
            low: 7,
        },
        {
            name: "april",
            high: 8,
            average: 5,
            low: 6,
        },
        {
            name: "may",
            high: 7,
            average: 8,
            low: 6,
        },
        {
            name: "june",
            high: 8,
            average: 9,
            low: 6,
        },
        {
            name: "july",
            high: 5,
            average: 6,
            low: 8,
        },
        {
            name: "august",
            high: 5,
            average: 9,
            low: 7,
        },
    ];

    return (
        <Chart
            title="importance"
            data={data}
            xKey="name"
            dataKeys={[
                { key: "high", color: randomColor() },
                { key: "average", color: randomColor() },
                { key: "low", color: randomColor() },
            ]}
        />
    );
}
