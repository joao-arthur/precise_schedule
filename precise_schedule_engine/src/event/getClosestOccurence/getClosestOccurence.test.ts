import type { Event, Frequency } from "../model.js";

import { assert, it } from "vitest";
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
    assert.strictEqual(getClosestOccurence(make("2000-01-01", "1_D"), "2023-08-01"), "2023-07-31");
});

it("getClosestOccurence 2_D", () => {
    assert.strictEqual(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-02"), "2023-06-01");
    assert.strictEqual(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-03"), "2023-06-01");
    assert.strictEqual(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-04"), "2023-06-03");
    assert.strictEqual(getClosestOccurence(make("2023-06-01", "2_D"), "2023-06-05"), "2023-06-03");

    assert.strictEqual(getClosestOccurence(make("2020-02-01", "2_D"), "2020-03-01"), "2020-02-29");

    assert.strictEqual(getClosestOccurence(make("2000-08-22", "2_D"), "2023-08-22"), "2023-08-20");
});

it("getClosestOccurence 1_W", () => {
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-05"), "2023-07-03");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-10"), "2023-07-03");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-11"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-12"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-13"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-14"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-15"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-16"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-17"), "2023-07-10");
    assert.strictEqual(getClosestOccurence(make("2023-07-03", "1_W"), "2023-07-18"), "2023-07-17");
});

it("getClosestOccurence 1_Y", () => {
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-07"), "2019-08-08");
    //assert.strictEqual(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-08"), "2019-08-08");
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "1_Y"), "2020-08-09"), "2020-08-08");

    assert.strictEqual(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-07"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-08"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "1_Y"), "2021-08-09"), "2021-08-08");
});

it("getClosestOccurence 2_Y", () => {
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-07"), "2019-08-08");
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-08"), "2019-08-08");
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2020-08-09"), "2019-08-08");

    assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-07"), "2019-08-08");
    //assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-08"), "2019-08-08");
    assert.strictEqual(getClosestOccurence(make("2019-08-08", "2_Y"), "2021-08-09"), "2019-08-08");

    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-07"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-08"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2021-08-09"), "2020-08-08");

    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-07"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-08"), "2020-08-08");
    assert.strictEqual(getClosestOccurence(make("2020-08-08", "2_Y"), "2022-08-09"), "2022-08-08");
});

it("getClosestOccurence NEVER", () => {
    assert.strictEqual(getClosestOccurence(make("2000-01-01", "NEVER"), "2023-08-01"), undefined);
});
