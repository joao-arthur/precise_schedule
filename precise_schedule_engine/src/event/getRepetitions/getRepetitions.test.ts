import type { Event, Frequency } from "../model.js";

import { assert, expect, it } from "vitest";
import { getRepetitions } from "./getRepetitions.js";

function make(day: string, frequency: Frequency): Event {
    return {
        id: "1",
        name: "nome",
        day,
        begin: "00:00",
        end: "23:59",
        frequency,
        weekendRepeat: false,
    };
}

it("getRepetitions 1_D", () => {
    expect(getRepetitions(make("2023-07-01", "1_D"), "2023-08-01", "2023-08-31")).toEqual(
        [
            "2023-08-01",
            "2023-08-02",
            "2023-08-03",
            "2023-08-04",
            "2023-08-05",
            "2023-08-06",
            "2023-08-07",
            "2023-08-08",
            "2023-08-09",
            "2023-08-10",
            "2023-08-11",
            "2023-08-12",
            "2023-08-13",
            "2023-08-14",
            "2023-08-15",
            "2023-08-16",
            "2023-08-17",
            "2023-08-18",
            "2023-08-19",
            "2023-08-20",
            "2023-08-21",
            "2023-08-22",
            "2023-08-23",
            "2023-08-24",
            "2023-08-25",
            "2023-08-26",
            "2023-08-27",
            "2023-08-28",
            "2023-08-29",
            "2023-08-30",
            "2023-08-31",
        ],
    );
});
