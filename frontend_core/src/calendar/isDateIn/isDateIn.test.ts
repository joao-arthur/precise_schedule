import { assert, it } from "vitest";
import { isDateIn } from "./isDateIn.js";

it("isDateIn", () => {
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-07-30"), false);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-07-31"), false);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-08-01"), true);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-08-02"), true);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-08-30"), true);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-08-31"), true);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-09-01"), false);
    assert.deepEqual(isDateIn({ year: 2023, month: 8 }, "2023-09-02"), false);
});
