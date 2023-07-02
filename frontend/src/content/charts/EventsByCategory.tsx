import { randomColor } from "@/lib/objects/randomColor";
import { Chart } from "./Chart";

export function EventsByCategory() {
    const data = [
        {
            name: "january",
            apointment: 7,
            meeting: 9,
            birthday: 2,
            party: 6,
            date: 1,
        },
        {
            name: "february",
            apointment: 6,
            meeting: 2,
            birthday: 3,
            party: 7,
            date: 3,
        },
        {
            name: "march",
            apointment: 4,
            meeting: 5,
            birthday: 8,
            party: 2,
            date: 0,
        },
        {
            name: "april",
            apointment: 7,
            meeting: 4,
            birthday: 5,
            party: 8,
            date: 6,
        },
        {
            name: "may",
            apointment: 8,
            meeting: 3,
            birthday: 1,
            party: 8,
            date: 6,
        },
        {
            name: "june",
            apointment: 0,
            meeting: 4,
            birthday: 2,
            party: 3,
            date: 6,
        },
        {
            name: "july",
            apointment: 8,
            meeting: 3,
            birthday: 1,
            party: 2,
            date: 4,
        },
        {
            name: "august",
            apointment: 5,
            meeting: 6,
            birthday: 3,
            party: 7,
            date: 8,
        },
    ];

    return (
        <Chart
            title="category"
            data={data}
            xKey="name"
            dataKeys={[
                { key: "apointment", color: randomColor() },
                { key: "meeting", color: randomColor() },
                { key: "birthday", color: randomColor() },
                { key: "party", color: randomColor() },
                { key: "date", color: randomColor() },
            ]}
        />
    );
}
