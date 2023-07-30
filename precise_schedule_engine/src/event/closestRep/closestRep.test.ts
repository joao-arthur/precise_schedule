import { assert, it } from "vitest";
import { closestRep } from "./closestRep.js";

it("closestRep 1D", () => {
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "1D" }, "2000-01-02"), "2000-01-01");
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "1D" }, "2023-08-01"), "2023-07-31");
});

it("closestRep 2D", () => {
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-02"), "2023-06-01");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-03"), "2023-06-01");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-04"), "2023-06-03");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-05"), "2023-06-03");

    assert.strictEqual(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-03"), "2023-06-02");
    assert.strictEqual(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-04"), "2023-06-02");
    assert.strictEqual(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-05"), "2023-06-04");
    assert.strictEqual(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-06"), "2023-06-04");

    assert.strictEqual(closestRep({ d: "2020-02-01", freq: "2D" }, "2020-03-01"), "2020-02-29");

    assert.strictEqual(closestRep({ d: "2000-08-22", freq: "2D" }, "2023-08-22"), "2023-08-20");
});

it("closestRep 1W", () => {
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-05"), "2023-07-03");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-10"), "2023-07-03");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-11"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-12"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-13"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-14"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-15"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-16"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-17"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-18"), "2023-07-17");
});

it("closestRep 1M", () => {
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-02-01"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-03-01"), "2023-02-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-04-01"), "2023-03-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-05-01"), "2023-04-03");
});

it("closestRep 3M", () => {
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-02-01"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-03-01"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-04-01"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-05-01"), "2023-04-03");
});

it("closestRep 6M", () => {
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-02-10"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-06-10"), "2023-01-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-10-10"), "2023-07-03");
    assert.strictEqual(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-12-10"), "2023-07-03");
});

it("closestRep 1Y", () => {
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-07"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-09"), "2020-08-08");

    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-09"), "2021-08-08");
});

it("closestRep 2Y", () => {
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-07"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-09"), "2019-08-08");

    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-07"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-09"), "2021-08-08");

    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-09"), "2020-08-08");

    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-09"), "2022-08-08");
});

it("closestRep undefined", () => {
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: undefined }, "2023-08-01"), undefined);
});

it("closestRep before date", () => {
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "1D" }, "1999-12-31"), undefined);
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "1D" }, "2000-01-01"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-05-31"), undefined);
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-01"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-02"), undefined);
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-03"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2020-04-13", freq: "1M" }, "2020-04-12"), undefined);
    assert.strictEqual(closestRep({ d: "2020-04-13", freq: "1M" }, "2020-04-13"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2008-04-13", freq: "3M" }, "2008-04-12"), undefined);
    assert.strictEqual(closestRep({ d: "2008-04-13", freq: "3M" }, "2008-04-13"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2009-10-13", freq: "6M" }, "2009-10-12"), undefined);
    assert.strictEqual(closestRep({ d: "2009-10-13", freq: "6M" }, "2009-10-13"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2010-06-13", freq: "1Y" }, "2010-06-13"), undefined);
    assert.strictEqual(closestRep({ d: "2010-06-13", freq: "1Y" }, "2010-06-13"), undefined);
    //
    assert.strictEqual(closestRep({ d: "2011-04-13", freq: "2Y" }, "2011-04-13"), undefined);
    assert.strictEqual(closestRep({ d: "2011-04-13", freq: "2Y" }, "2011-04-13"), undefined);
});
