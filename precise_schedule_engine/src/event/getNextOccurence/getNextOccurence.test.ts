import type { Event, Frequency } from "../model.js";

import { expect, it } from "vitest";
import { getNextOccurence } from "./getNextOccurence.js";

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

it("getNextOccurence 1_D", () => {
    expect(getNextOccurence(make("2000-01-01", "1_D"))).toBe("2000-01-02");
});

it("getNextOccurence 2_D", () => {
    expect(getNextOccurence(make("2000-01-01", "2_D"))).toBe("2000-01-03");
});

it("getNextOccurence 1_W", () => {
    expect(getNextOccurence(make("2000-01-01", "1_W"))).toBe("2000-01-08");
});

it("getNextOccurence 1_M", () => {
    expect(getNextOccurence(make("2000-01-01", "1_M"))).toBe("2000-02-01");

    expect(getNextOccurence(make("2019-01-28", "1_M"))).toBe("2019-02-28");
    expect(getNextOccurence(make("2019-01-29", "1_M"))).toBe("2019-02-28");
    expect(getNextOccurence(make("2019-01-30", "1_M"))).toBe("2019-02-28");
    expect(getNextOccurence(make("2019-01-31", "1_M"))).toBe("2019-02-28");

    expect(getNextOccurence(make("2020-01-28", "1_M"))).toBe("2020-02-28");
    expect(getNextOccurence(make("2020-01-29", "1_M"))).toBe("2020-02-29");
    expect(getNextOccurence(make("2020-01-30", "1_M"))).toBe("2020-02-29");
    expect(getNextOccurence(make("2020-01-31", "1_M"))).toBe("2020-02-29");
});

it("getNextOccurence 3_M", () => {
    expect(getNextOccurence(make("1999-11-30", "3_M"))).toBe("2000-02-29");
    expect(getNextOccurence(make("2000-02-29", "3_M"))).toBe("2000-05-29");
    expect(getNextOccurence(make("2000-05-29", "3_M"))).toBe("2000-08-29");
    expect(getNextOccurence(make("2000-08-29", "3_M"))).toBe("2000-11-29");
});

it("getNextOccurence 6_M", () => {
    expect(getNextOccurence(make("1999-08-31", "6_M"))).toBe("2000-02-29");
    expect(getNextOccurence(make("2000-02-29", "6_M"))).toBe("2000-08-29");
});

it("getNextOccurence 1_Y", () => {
    expect(getNextOccurence(make("2000-01-01", "1_Y"))).toBe("2001-01-01");

    expect(getNextOccurence(make("2019-02-28", "1_Y"))).toBe("2020-02-28");
    expect(getNextOccurence(make("2020-02-29", "1_Y"))).toBe("2021-02-28");
    expect(getNextOccurence(make("2021-02-28", "1_Y"))).toBe("2022-02-28");
});

it("getNextOccurence NEVER", () => {
    expect(getNextOccurence(make("2000-01-01", "NEVER"))).toBe(undefined);
});
