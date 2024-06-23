import { assert, it } from "vitest";
import { current } from "./current.js";

it("current", () => {
    assert.deepEqual(current().year, 2024);
    assert.deepEqual(current().month, 6);
});
