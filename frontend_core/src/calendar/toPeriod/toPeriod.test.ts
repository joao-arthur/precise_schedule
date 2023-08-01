import { assert, it } from "vitest";
import { toPeriod } from "./toPeriod.js";

it("toPeriod", () => {
    assert.deepEqual(toPeriod({ year: 2019, month: 1 }), ["2019-01-01", "2019-01-31"]);
    assert.deepEqual(toPeriod({ year: 2019, month: 2 }), ["2019-02-01", "2019-02-28"]);
    assert.deepEqual(toPeriod({ year: 2019, month: 3 }), ["2019-03-01", "2019-03-31"]);
    assert.deepEqual(toPeriod({ year: 2019, month: 4 }), ["2019-04-01", "2019-04-30"]);
    assert.deepEqual(toPeriod({ year: 2020, month: 1 }), ["2020-01-01", "2020-01-31"]);
    assert.deepEqual(toPeriod({ year: 2020, month: 2 }), ["2020-02-01", "2020-02-29"]);
    assert.deepEqual(toPeriod({ year: 2020, month: 3 }), ["2020-03-01", "2020-03-31"]);
    assert.deepEqual(toPeriod({ year: 2020, month: 4 }), ["2020-04-01", "2020-04-30"]);
    assert.deepEqual(toPeriod({ year: 2021, month: 1 }), ["2021-01-01", "2021-01-31"]);
    assert.deepEqual(toPeriod({ year: 2021, month: 2 }), ["2021-02-01", "2021-02-28"]);
    assert.deepEqual(toPeriod({ year: 2021, month: 3 }), ["2021-03-01", "2021-03-31"]);
    assert.deepEqual(toPeriod({ year: 2021, month: 4 }), ["2021-04-01", "2021-04-30"]);
});
