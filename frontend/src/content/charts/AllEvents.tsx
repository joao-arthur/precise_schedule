import { Chart } from "./Chart";
import { randomColor } from "@/lib/objects/randomColor";

export function AllEvents() {
    const data = [
        {
            name: "january",
            events: 30,
        },
        {
            name: "february",
            events: 29,
        },
        {
            name: "march",
            events: 10,
        },
        {
            name: "april",
            events: 5,
        },
        {
            name: "may",
            events: 54,
        },
        {
            name: "june",
            events: 9,
        },
        {
            name: "july",
            events: 20,
        },
        {
            name: "august",
            events: 25,
        },
    ];

    return (
        <Chart
            title="total"
            data={data}
            xKey="name"
            dataKeys={[{ key: "events", color: randomColor() }]}
        />
    );
}
