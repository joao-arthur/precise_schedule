import { assert, it } from "vitest";
import { formatDay } from "./formatDay.js";

it("formatDay", () => {
    assert.strictEqual(formatDay("2023-08-23"), "23");
    assert.strictEqual(formatDay("2020-02-29"), "29");
    assert.strictEqual(formatDay("2014-08-08"), "08");
    assert.strictEqual(formatDay("2000-05-09"), "09");
});
