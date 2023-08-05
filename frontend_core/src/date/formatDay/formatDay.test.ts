import { assert, it } from "vitest";
import { formatDay } from "./formatDay.js";

it("formatDay", () => {
    assert.equal(formatDay("2023-08-23"), "23");
    assert.equal(formatDay("2020-02-29"), "29");
    assert.equal(formatDay("2014-08-08"), "08");
    assert.equal(formatDay("2000-05-09"), "09");
});
