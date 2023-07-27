import type { Event, Frequency } from "../model.js";

import { expect, it } from "vitest";
import { getClosestOccurence } from "./getClosestOccurence.js";

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

it("getClosestOccurence 1_D", () => {
    expect(getClosestOccurence(make("2000-01-01", "1_D"), "2023-08-01")).toBe("2023-07-31");
});

it("getClosestOccurence 2_D", () => {
    expect(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-02")).toBe("2023-06-01");
    expect(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-03")).toBe("2023-06-01");
    expect(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-04")).toBe("2023-06-03");
    expect(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-05")).toBe("2023-06-03");

    expect(getClosestOccurence(make("2020-02-01", "2_D"), "2020-03-01")).toBe("2020-02-29");

    expect(getClosestOccurence(make("2000-08-22", "2_D"), "2023-08-22")).toBe("2023-08-20");
});

it("getClosestOccurence 1_W", () => {
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-05")).toBe("2023-07-03");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-10")).toBe("2023-07-03");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-11")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-12")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-13")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-14")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-15")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-16")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-17")).toBe("2023-07-10");
    expect(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-18")).toBe("2023-07-17");
});

it("getClosestOccurence 1_Y", () => {
    expect(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-07")).toBe("2019-08-08");
    //expect(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-08")).toBe("2019-08-08");
    expect(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-09")).toBe("2020-08-08");

    expect(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-07")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-08")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-09")).toBe("2021-08-08");
});

it("getClosestOccurence 2_Y", () => {
    expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-07")).toBe("2019-08-08");
    expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-08")).toBe("2019-08-08");
    expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-09")).toBe("2019-08-08");

    expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-07")).toBe("2019-08-08");
    //expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-08")).toBe("2019-08-08");
    expect(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-09")).toBe("2019-08-08");

    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-07")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-08")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-09")).toBe("2020-08-08");

    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-07")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-08")).toBe("2020-08-08");
    expect(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-09")).toBe("2022-08-08");
});

it("getClosestOccurence NEVER", () => {
    expect(getClosestOccurence(make("2000-01-01", "NEVER"), "2023-08-01")).toBe(undefined);
});
