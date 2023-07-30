import { assert, it } from "vitest";
import { repInPeriod } from "./repInPeriod.js";

it("repInPeriod 1D", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "1D" }, "2023-08-01", "2023-08-31"),
        [
            "2023-08-01",
            "2023-08-02",
            "2023-08-03",
            "2023-08-04",
            "2023-08-05",
            "2023-08-06",
            "2023-08-07",
            "2023-08-08",
            "2023-08-09",
            "2023-08-10",
            "2023-08-11",
            "2023-08-12",
            "2023-08-13",
            "2023-08-14",
            "2023-08-15",
            "2023-08-16",
            "2023-08-17",
            "2023-08-18",
            "2023-08-19",
            "2023-08-20",
            "2023-08-21",
            "2023-08-22",
            "2023-08-23",
            "2023-08-24",
            "2023-08-25",
            "2023-08-26",
            "2023-08-27",
            "2023-08-28",
            "2023-08-29",
            "2023-08-30",
            "2023-08-31",
        ],
    );
});

it("repInPeriod 2D", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "2D" }, "2023-08-01", "2023-08-31"),
        [
            "2023-08-02",
            "2023-08-04",
            "2023-08-06",
            "2023-08-08",
            "2023-08-10",
            "2023-08-12",
            "2023-08-14",
            "2023-08-16",
            "2023-08-18",
            "2023-08-20",
            "2023-08-22",
            "2023-08-24",
            "2023-08-26",
            "2023-08-28",
            "2023-08-30",
        ],
    );
});

it("repInPeriod 1W", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "1W" }, "2023-08-01", "2023-08-31"),
        [
            "2023-08-05",
            "2023-08-12",
            "2023-08-19",
            "2023-08-26",
        ],
    );
});

it("repInPeriod 1W", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "1W" }, "2023-08-01", "2023-08-31"),
        [
            "2023-08-05",
            "2023-08-12",
            "2023-08-19",
            "2023-08-26",
        ],
    );
});

it("repInPeriod 1M", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-06-10", freq: "1M" }, "2023-08-01", "2023-08-31"),
        ["2023-08-10"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-28", freq: "1M" }, "2020-02-01", "2020-02-29"),
        ["2020-02-28"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-29", freq: "1M" }, "2020-02-01", "2020-02-29"),
        ["2020-02-29"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-30", freq: "1M" }, "2020-02-01", "2020-02-29"),
        ["2020-02-29"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "1M" }, "2020-02-01", "2020-02-29"),
        ["2020-02-29"],
    );
});

it("repInPeriod 3M", () => {
    assert.deepEqual(
        repInPeriod({ d: "2020-01-28", freq: "3M" }, "2020-04-01", "2020-04-30"),
        ["2020-04-28"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-29", freq: "3M" }, "2020-04-01", "2020-04-30"),
        ["2020-04-29"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-30", freq: "3M" }, "2020-04-01", "2020-04-30"),
        ["2020-04-30"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "3M" }, "2020-04-01", "2020-04-30"),
        ["2020-04-30"],
    );
});

it("repInPeriod 6M", () => {
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "6M" }, "2020-07-01", "2020-07-30"),
        ["2020-07-31"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-07-31", freq: "6M" }, "2021-01-01", "2021-01-31"),
        ["2021-01-31"],
    );
});

it("repInPeriod 1Y", () => {
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "1Y" }, "2020-07-01", "2020-07-30"),
        ["2020-07-31"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-07-31", freq: "1Y" }, "2021-01-01", "2021-01-31"),
        ["2021-01-31"],
    );
});

it("closestRep undefined", () => {
    assert.deepEqual(
        repInPeriod({ d: "2000-01-01", freq: undefined }, "2023-08-01", "2023-08-31"),
        [],
    );
});

it("closestRep between repetition", () => {
    assert.deepEqual(
        repInPeriod({ d: "2008-03-01", freq: "3M" }, "2008-04-01", "2008-04-30"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2009-04-01", freq: "6M" }, "2009-08-01", "2009-08-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2010-05-01", freq: "1Y" }, "2011-04-01", "2011-04-30"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2011-06-01", freq: "2Y" }, "2012-06-01", "2012-06-30"),
        [],
    );
});

it("closestRep before date", () => {
    assert.deepEqual(
        repInPeriod({ d: "2000-01-01", freq: "1D" }, "1999-12-01", "1999-12-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2023-06-01", freq: "2D" }, "2023-05-01", "2023-05-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "1W" }, "2023-06-01", "2023-06-30"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2021-04-01", freq: "1M" }, "2021-03-01", "2021-03-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2008-03-01", freq: "3M" }, "2008-02-01", "2008-02-29"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2009-10-01", freq: "6M" }, "2009-09-01", "2009-09-30"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2010-09-01", freq: "1Y" }, "2010-08-01", "2010-08-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2011-08-01", freq: "2Y" }, "2011-07-01", "2011-07-31"),
        [],
    );
});
