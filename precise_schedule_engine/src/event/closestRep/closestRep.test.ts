import { assert, it } from "vitest";
import { closestRep } from "./closestRep.js";

it("closestRep 1_D", () => {
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "1_D" }, "2023-08-01"), "2023-07-31");
});

it("closestRep 2_D", () => {
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2_D" }, "2023-06-02"), "2023-06-01");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2_D" }, "2023-06-03"), "2023-06-01");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2_D" }, "2023-06-04"), "2023-06-03");
    assert.strictEqual(closestRep({ d: "2023-06-01", freq: "2_D" }, "2023-06-05"), "2023-06-03");

    assert.strictEqual(closestRep({ d: "2020-02-01", freq: "2_D" }, "2020-03-01"), "2020-02-29");

    assert.strictEqual(closestRep({ d: "2000-08-22", freq: "2_D" }, "2023-08-22"), "2023-08-20");
});

it("closestRep 1_W", () => {
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-05"), "2023-07-03");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-10"), "2023-07-03");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-11"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-12"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-13"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-14"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-15"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-16"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-17"), "2023-07-10");
    assert.strictEqual(closestRep({ d: "2023-07-03", freq: "1_W" }, "2023-07-18"), "2023-07-17");
});

it("closestRep 1_Y", () => {
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "1_Y" }, "2020-08-07"), "2019-08-08");
    //assert.strictEqual(closestRep({d: "2019-08-08", freq: "1_Y"}, "2020-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({ d: "2019-08-08", freq: "1_Y" }, "2020-08-09"), "2020-08-08");

    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1_Y" }, "2021-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1_Y" }, "2021-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({ d: "2020-08-08", freq: "1_Y" }, "2021-08-09"), "2021-08-08");
});

/*it("closestRep 2_Y", () => {
    assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2020-08-07"), "2019-08-08");
    assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2020-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2020-08-09"), "2019-08-08");

    assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2021-08-07"), "2019-08-08");
    //assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2021-08-08"), "2019-08-08");
    assert.strictEqual(closestRep({d: "2019-08-08", freq: "2_Y"}, "2021-08-09"), "2019-08-08");

    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2021-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2021-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2021-08-09"), "2020-08-08");

    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2022-08-07"), "2020-08-08");
    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2022-08-08"), "2020-08-08");
    assert.strictEqual(closestRep({d: "2020-08-08", freq: "2_Y"}, "2022-08-09"), "2022-08-08");
});*/

it("closestRep NEVER", () => {
    assert.strictEqual(closestRep({ d: "2000-01-01", freq: "NEVER" }, "2023-08-01"), undefined);
});
