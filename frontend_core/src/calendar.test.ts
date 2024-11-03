import { assert, it } from "vitest";
import { isCurrent, isDateIn, toPeriod, toTable } from "./calendar.js";

const assertEquals = assert.deepStrictEqual;

const year = 2024;

it("isCurrent", () => {
    assertEquals(isCurrent({ year, month: 1 }), false);
    assertEquals(isCurrent({ year, month: 2 }), false);
    assertEquals(isCurrent({ year, month: 3 }), false);
    assertEquals(isCurrent({ year, month: 4 }), false);
    assertEquals(isCurrent({ year, month: 5 }), false);
    assertEquals(isCurrent({ year, month: 6 }), false);
    assertEquals(isCurrent({ year, month: 7 }), false);
    assertEquals(isCurrent({ year, month: 8 }), false);
    assertEquals(isCurrent({ year, month: 9 }), false);
    assertEquals(isCurrent({ year, month: 10 }), false);
    assertEquals(isCurrent({ year, month: 11 }), true);
    assertEquals(isCurrent({ year, month: 12 }), false);
});

it("isDateIn", () => {
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-07-30"), false);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-07-31"), false);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-08-01"), true);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-08-02"), true);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-08-30"), true);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-08-31"), true);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-09-01"), false);
    assertEquals(isDateIn({ year: 2023, month: 8 }, "2023-09-02"), false);
});

it("toPeriod", () => {
    assertEquals(toPeriod({ year: 2019, month: 1 }), ["2019-01-01", "2019-01-31"]);
    assertEquals(toPeriod({ year: 2019, month: 2 }), ["2019-02-01", "2019-02-28"]);
    assertEquals(toPeriod({ year: 2019, month: 3 }), ["2019-03-01", "2019-03-31"]);
    assertEquals(toPeriod({ year: 2019, month: 4 }), ["2019-04-01", "2019-04-30"]);
    assertEquals(toPeriod({ year: 2020, month: 1 }), ["2020-01-01", "2020-01-31"]);
    assertEquals(toPeriod({ year: 2020, month: 2 }), ["2020-02-01", "2020-02-29"]);
    assertEquals(toPeriod({ year: 2020, month: 3 }), ["2020-03-01", "2020-03-31"]);
    assertEquals(toPeriod({ year: 2020, month: 4 }), ["2020-04-01", "2020-04-30"]);
    assertEquals(toPeriod({ year: 2021, month: 1 }), ["2021-01-01", "2021-01-31"]);
    assertEquals(toPeriod({ year: 2021, month: 2 }), ["2021-02-01", "2021-02-28"]);
    assertEquals(toPeriod({ year: 2021, month: 3 }), ["2021-03-01", "2021-03-31"]);
    assertEquals(toPeriod({ year: 2021, month: 4 }), ["2021-04-01", "2021-04-30"]);
});

it("toTable", () => {
    assertEquals(
        toTable({ year: 2023, month: 8 }),
        [
            [
                "2023-07-30",
                "2023-07-31",
                "2023-08-01",
                "2023-08-02",
                "2023-08-03",
                "2023-08-04",
                "2023-08-05",
            ],
            [
                "2023-08-06",
                "2023-08-07",
                "2023-08-08",
                "2023-08-09",
                "2023-08-10",
                "2023-08-11",
                "2023-08-12",
            ],
            [
                "2023-08-13",
                "2023-08-14",
                "2023-08-15",
                "2023-08-16",
                "2023-08-17",
                "2023-08-18",
                "2023-08-19",
            ],
            [
                "2023-08-20",
                "2023-08-21",
                "2023-08-22",
                "2023-08-23",
                "2023-08-24",
                "2023-08-25",
                "2023-08-26",
            ],
            [
                "2023-08-27",
                "2023-08-28",
                "2023-08-29",
                "2023-08-30",
                "2023-08-31",
                "2023-09-01",
                "2023-09-02",
            ],
            [
                "2023-09-03",
                "2023-09-04",
                "2023-09-05",
                "2023-09-06",
                "2023-09-07",
                "2023-09-08",
                "2023-09-09",
            ],
        ],
    );
});
