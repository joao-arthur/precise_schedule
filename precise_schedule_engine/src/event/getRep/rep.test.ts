import { assert, it } from "vitest";
import { getNextOccurence } from "./getNextOccurence.js";

it("getNextOccurence 1_D", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "1_D" }), "2000-01-02");
});

it("getNextOccurence 2_D", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "2_D" }), "2000-01-03");
});

it("getNextOccurence 1_W", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "1_W" }), "2000-01-08");
});

it("getNextOccurence 1_M", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "1_M" }), "2000-02-01");

    assert.strictEqual(getNextOccurence({ d: "2019-01-28", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(getNextOccurence({ d: "2019-01-29", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(getNextOccurence({ d: "2019-01-30", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(getNextOccurence({ d: "2019-01-31", freq: "1_M" }), "2019-02-28");

    assert.strictEqual(getNextOccurence({ d: "2020-01-28", freq: "1_M" }), "2020-02-28");
    assert.strictEqual(getNextOccurence({ d: "2020-01-29", freq: "1_M" }), "2020-02-29");
    assert.strictEqual(getNextOccurence({ d: "2020-01-30", freq: "1_M" }), "2020-02-29");
    assert.strictEqual(getNextOccurence({ d: "2020-01-31", freq: "1_M" }), "2020-02-29");
});

it("getNextOccurence 3_M", () => {
    assert.strictEqual(getNextOccurence({ d: "1999-11-30", freq: "3_M" }), "2000-02-29");
    assert.strictEqual(getNextOccurence({ d: "2000-02-29", freq: "3_M" }), "2000-05-29");
    assert.strictEqual(getNextOccurence({ d: "2000-05-29", freq: "3_M" }), "2000-08-29");
    assert.strictEqual(getNextOccurence({ d: "2000-08-29", freq: "3_M" }), "2000-11-29");
});

it("getNextOccurence 6_M", () => {
    assert.strictEqual(getNextOccurence({ d: "1999-08-31", freq: "6_M" }), "2000-02-29");
    assert.strictEqual(getNextOccurence({ d: "2000-02-29", freq: "6_M" }), "2000-08-29");
});

it("getNextOccurence 1_Y", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "1_Y" }), "2001-01-01");

    assert.strictEqual(getNextOccurence({ d: "2019-02-28", freq: "1_Y" }), "2020-02-28");
    assert.strictEqual(getNextOccurence({ d: "2020-02-29", freq: "1_Y" }), "2021-02-28");
    assert.strictEqual(getNextOccurence({ d: "2021-02-28", freq: "1_Y" }), "2022-02-28");
});

it("getNextOccurence NEVER", () => {
    assert.strictEqual(getNextOccurence({ d: "2000-01-01", freq: "NEVER" }), undefined);
});
