import { assert, it } from "vitest";
import { isCurrent } from "./isCurrent.js";

const year = 2023;

it("isCurrent", () => {
    assert.deepEqual(isCurrent({ year, month: 1 }), false);
    assert.deepEqual(isCurrent({ year, month: 2 }), false);
    assert.deepEqual(isCurrent({ year, month: 3 }), false);
    assert.deepEqual(isCurrent({ year, month: 4 }), false);
    assert.deepEqual(isCurrent({ year, month: 5 }), false);
    assert.deepEqual(isCurrent({ year, month: 6 }), false);
    assert.deepEqual(isCurrent({ year, month: 7 }), false);
    assert.deepEqual(isCurrent({ year, month: 8 }), true);
    assert.deepEqual(isCurrent({ year, month: 9 }), false);
    assert.deepEqual(isCurrent({ year, month: 10 }), false);
    assert.deepEqual(isCurrent({ year, month: 11 }), false);
    assert.deepEqual(isCurrent({ year, month: 12 }), false);
});
