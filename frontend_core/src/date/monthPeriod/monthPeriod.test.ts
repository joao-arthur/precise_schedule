import { assert, it } from "vitest";
import { monthPeriod } from "./monthPeriod.js";

it("monthPeriod", () => {
    assert.deepEqual(monthPeriod(2019, 1), ["2019-01-01", "2019-01-31"]);
    assert.deepEqual(monthPeriod(2019, 2), ["2019-02-01", "2019-02-28"]);
    assert.deepEqual(monthPeriod(2019, 3), ["2019-03-01", "2019-03-31"]);
    assert.deepEqual(monthPeriod(2019, 4), ["2019-04-01", "2019-04-30"]);
    assert.deepEqual(monthPeriod(2020, 1), ["2020-01-01", "2020-01-31"]);
    assert.deepEqual(monthPeriod(2020, 2), ["2020-02-01", "2020-02-29"]);
    assert.deepEqual(monthPeriod(2020, 3), ["2020-03-01", "2020-03-31"]);
    assert.deepEqual(monthPeriod(2020, 4), ["2020-04-01", "2020-04-30"]);
    assert.deepEqual(monthPeriod(2021, 1), ["2021-01-01", "2021-01-31"]);
    assert.deepEqual(monthPeriod(2021, 2), ["2021-02-01", "2021-02-28"]);
    assert.deepEqual(monthPeriod(2021, 3), ["2021-03-01", "2021-03-31"]);
    assert.deepEqual(monthPeriod(2021, 4), ["2021-04-01", "2021-04-30"]);
});
