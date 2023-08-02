import { assert, expect, it } from "vitest";
import { map } from "funis";
import { getOnCalendar } from "./getOnCalendar.js";

it("getOnCalendar", () => {
    const res = getOnCalendar([], { year: 2023, month: 8 });
    assert.deepEqual(map.entries(res), []);
});

it("getOnCalendar", () => {
    const res = getOnCalendar(
        [
            {
                id: "tequila",
                name: "daram daramram ram ramram",
                begin: "08:00",
                end: "18:00",
                category: "APPOINTMENT",
                weekendRepeat: true,
                day: "2023-07-31",
                frequency: "1W",
            },
            {
                id: "vodka",
                name: "ou água de coco",
                begin: "08:00",
                end: "18:00",
                category: "APPOINTMENT",
                weekendRepeat: true,
                day: "2023-07-14",
                frequency: "1M",
            },
        ],
        { year: 2023, month: 8 },
    );
    assert.deepEqual(
        map.entries(res),
        [
            ["2023-08-07", ["tequila"]],
            ["2023-08-14", ["tequila", "vodka"]],
            ["2023-08-21", ["tequila"]],
            ["2023-08-28", ["tequila"]],
        ],
    );
});
