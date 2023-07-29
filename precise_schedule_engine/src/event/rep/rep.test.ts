import { assert, it } from "vitest";
import { rep } from "./rep.js";

it("rep 1_D", () => {
    assert.strictEqual(rep({ d: "1999-12-31", freq: "1_D" }), "2000-01-01");
    assert.strictEqual(rep({ d: "2000-01-01", freq: "1_D" }), "2000-01-02");
    //
    assert.strictEqual(rep({ d: "2020-02-28", freq: "1_D" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "1_D" }), "2020-03-01");
    //
    assert.strictEqual(rep({ d: "2021-02-28", freq: "1_D" }), "2021-03-01");
    assert.strictEqual(rep({ d: "2021-03-01", freq: "1_D" }), "2021-03-02");
});

it("rep 2_D", () => {
    assert.strictEqual(rep({ d: "1999-12-31", freq: "2_D" }), "2000-01-02");
    assert.strictEqual(rep({ d: "2000-01-01", freq: "2_D" }), "2000-01-03");
    //
    assert.strictEqual(rep({ d: "2020-02-27", freq: "2_D" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-02-28", freq: "2_D" }), "2020-03-01");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "2_D" }), "2020-03-02");
    //
    assert.strictEqual(rep({ d: "2021-02-27", freq: "2_D" }), "2021-03-01");
    assert.strictEqual(rep({ d: "2021-02-28", freq: "2_D" }), "2021-03-02");
    assert.strictEqual(rep({ d: "2021-03-01", freq: "2_D" }), "2021-03-03");
});

it("rep 1_W", () => {
    assert.strictEqual(rep({ d: "1999-12-24", freq: "1_W" }), "1999-12-31");
    assert.strictEqual(rep({ d: "1999-12-25", freq: "1_W" }), "2000-01-01");
    assert.strictEqual(rep({ d: "2000-01-01", freq: "1_W" }), "2000-01-08");
    //
    assert.strictEqual(rep({ d: "2020-02-21", freq: "1_W" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2020-02-22", freq: "1_W" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-02-23", freq: "1_W" }), "2020-03-01");
    assert.strictEqual(rep({ d: "2020-02-24", freq: "1_W" }), "2020-03-02");
    //
    assert.strictEqual(rep({ d: "2021-02-21", freq: "1_W" }), "2021-02-28");
    assert.strictEqual(rep({ d: "2021-02-22", freq: "1_W" }), "2021-03-01");
    assert.strictEqual(rep({ d: "2021-02-23", freq: "1_W" }), "2021-03-02");
    assert.strictEqual(rep({ d: "2021-02-24", freq: "1_W" }), "2021-03-03");
});

it("rep 1_M", () => {
    assert.strictEqual(rep({ d: "2000-01-01", freq: "1_M" }), "2000-02-01");
    //
    assert.strictEqual(rep({ d: "2019-01-28", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(rep({ d: "2019-01-29", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(rep({ d: "2019-01-30", freq: "1_M" }), "2019-02-28");
    assert.strictEqual(rep({ d: "2019-01-31", freq: "1_M" }), "2019-02-28");
    //
    assert.strictEqual(rep({ d: "2020-01-28", freq: "1_M" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2020-01-29", freq: "1_M" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-01-30", freq: "1_M" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-01-31", freq: "1_M" }), "2020-02-29");
    //
    assert.strictEqual(rep({ d: "2020-01-31", freq: "1_M" }), "2020-02-29");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "1_M" }), "2020-03-29");
    //
    assert.strictEqual(rep({ d: "2020-03-31", freq: "1_M" }), "2020-04-30");
    assert.strictEqual(rep({ d: "2020-04-30", freq: "1_M" }), "2020-05-30");
});

it("rep 3_M", () => {
    assert.strictEqual(rep({ d: "1999-11-30", freq: "3_M" }), "2000-02-29");
    assert.strictEqual(rep({ d: "2000-02-29", freq: "3_M" }), "2000-05-29");
    assert.strictEqual(rep({ d: "2000-05-29", freq: "3_M" }), "2000-08-29");
    assert.strictEqual(rep({ d: "2000-08-29", freq: "3_M" }), "2000-11-29");
    //
    assert.strictEqual(rep({ d: "2020-01-31", freq: "3_M" }), "2020-04-30");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "3_M" }), "2020-05-29");
    assert.strictEqual(rep({ d: "2020-03-31", freq: "3_M" }), "2020-06-30");
    assert.strictEqual(rep({ d: "2020-04-30", freq: "3_M" }), "2020-07-30");
});

it("rep 6_M", () => {
    assert.strictEqual(rep({ d: "1999-08-31", freq: "6_M" }), "2000-02-29");
    assert.strictEqual(rep({ d: "2000-02-29", freq: "6_M" }), "2000-08-29");
    assert.strictEqual(rep({ d: "2000-08-29", freq: "6_M" }), "2001-02-28");
    assert.strictEqual(rep({ d: "2001-02-28", freq: "6_M" }), "2001-08-28");
    //
    assert.strictEqual(rep({ d: "2020-01-31", freq: "6_M" }), "2020-07-31");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "6_M" }), "2020-08-29");
    assert.strictEqual(rep({ d: "2020-03-31", freq: "6_M" }), "2020-09-30");
    assert.strictEqual(rep({ d: "2020-04-30", freq: "6_M" }), "2020-10-30");
});

it("rep 1_Y", () => {
    assert.strictEqual(rep({ d: "2000-01-01", freq: "1_Y" }), "2001-01-01");
    //
    assert.strictEqual(rep({ d: "2019-02-28", freq: "1_Y" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2020-02-28", freq: "1_Y" }), "2021-02-28");
    assert.strictEqual(rep({ d: "2021-02-28", freq: "1_Y" }), "2022-02-28");
    //
    assert.strictEqual(rep({ d: "2019-02-28", freq: "1_Y" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "1_Y" }), "2021-02-28");
    assert.strictEqual(rep({ d: "2021-02-28", freq: "1_Y" }), "2022-02-28");
    //
    assert.strictEqual(rep({ d: "2019-06-30", freq: "1_Y" }), "2020-06-30");
    assert.strictEqual(rep({ d: "2020-06-30", freq: "1_Y" }), "2021-06-30");
    assert.strictEqual(rep({ d: "2021-06-30", freq: "1_Y" }), "2022-06-30");
    //
    assert.strictEqual(rep({ d: "2019-08-31", freq: "1_Y" }), "2020-08-31");
    assert.strictEqual(rep({ d: "2020-08-31", freq: "1_Y" }), "2021-08-31");
    assert.strictEqual(rep({ d: "2021-08-31", freq: "1_Y" }), "2022-08-31");
});

it("rep 2_Y", () => {
    assert.strictEqual(rep({ d: "2000-01-01", freq: "2_Y" }), "2002-01-01");
    //
    assert.strictEqual(rep({ d: "2018-02-28", freq: "2_Y" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2019-02-28", freq: "2_Y" }), "2021-02-28");
    assert.strictEqual(rep({ d: "2020-02-28", freq: "2_Y" }), "2022-02-28");
    assert.strictEqual(rep({ d: "2021-02-28", freq: "2_Y" }), "2023-02-28");
    //
    assert.strictEqual(rep({ d: "2018-02-28", freq: "2_Y" }), "2020-02-28");
    assert.strictEqual(rep({ d: "2019-02-28", freq: "2_Y" }), "2021-02-28");
    assert.strictEqual(rep({ d: "2020-02-29", freq: "2_Y" }), "2022-02-28");
    assert.strictEqual(rep({ d: "2021-02-28", freq: "2_Y" }), "2023-02-28");
    //
    assert.strictEqual(rep({ d: "2018-06-30", freq: "2_Y" }), "2020-06-30");
    assert.strictEqual(rep({ d: "2019-06-30", freq: "2_Y" }), "2021-06-30");
    assert.strictEqual(rep({ d: "2020-06-30", freq: "2_Y" }), "2022-06-30");
    assert.strictEqual(rep({ d: "2021-06-30", freq: "2_Y" }), "2023-06-30");
    //
    assert.strictEqual(rep({ d: "2018-08-31", freq: "2_Y" }), "2020-08-31");
    assert.strictEqual(rep({ d: "2019-08-31", freq: "2_Y" }), "2021-08-31");
    assert.strictEqual(rep({ d: "2020-08-31", freq: "2_Y" }), "2022-08-31");
    assert.strictEqual(rep({ d: "2021-08-31", freq: "2_Y" }), "2023-08-31");
});

it("rep NEVER", () => {
    assert.strictEqual(rep({ d: "2000-01-01", freq: "NEVER" }), undefined);
});
