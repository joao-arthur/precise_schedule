import { assert, it } from "vitest";
import { currentYear } from "./currentYear.js";

it("currentYear", () => {
    assert.deepEqual(currentYear(), 2023);
});
