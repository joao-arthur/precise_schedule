import { assert, it } from "vitest";
import { currentMonth } from "./currentMonth.js";

it("currentMonth", () => {
    assert.deepEqual(currentMonth(), 8);
});
