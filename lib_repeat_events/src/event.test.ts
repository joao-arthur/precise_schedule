import { assert, it } from "vitest";
import { closestRep, rep, repInPeriod, repLazy } from "./event.js";

const assertEquals = assert.deepStrictEqual;

it("closestRep 1D", () => {
    assertEquals(closestRep({ d: "2000-01-01", freq: "1D" }, "2000-01-02"), "2000-01-01");
    assertEquals(closestRep({ d: "2000-01-01", freq: "1D" }, "2023-08-01"), "2023-07-31");
});

it("closestRep 2D", () => {
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-02"), "2023-06-01");
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-03"), "2023-06-01");
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-04"), "2023-06-03");
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-05"), "2023-06-03");
    assertEquals(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-03"), "2023-06-02");
    assertEquals(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-04"), "2023-06-02");
    assertEquals(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-05"), "2023-06-04");
    assertEquals(closestRep({ d: "2023-06-02", freq: "2D" }, "2023-06-06"), "2023-06-04");
    assertEquals(closestRep({ d: "2020-02-01", freq: "2D" }, "2020-03-01"), "2020-02-29");
    assertEquals(closestRep({ d: "2000-08-22", freq: "2D" }, "2023-08-22"), "2023-08-20");
});

it("closestRep 1W", () => {
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-05"), "2023-07-03");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-10"), "2023-07-03");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-11"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-12"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-13"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-14"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-15"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-16"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-17"), "2023-07-10");
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-18"), "2023-07-17");
});

it("closestRep 1M", () => {
    assertEquals(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-02-01"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-03-01"), "2023-02-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-04-01"), "2023-03-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "1M" }, "2023-05-01"), "2023-04-03");
});

it("closestRep 3M", () => {
    assertEquals(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-02-01"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-03-01"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-04-01"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "3M" }, "2023-05-01"), "2023-04-03");
});

it("closestRep 6M", () => {
    assertEquals(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-02-10"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-06-10"), "2023-01-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-10-10"), "2023-07-03");
    assertEquals(closestRep({ d: "2019-01-03", freq: "6M" }, "2023-12-10"), "2023-07-03");
});

it("closestRep 1Y", () => {
    assertEquals(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-07"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-08"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "1Y" }, "2020-08-09"), "2020-08-08");

    assertEquals(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-07"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-08"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "1Y" }, "2021-08-09"), "2021-08-08");
});

it("closestRep 2Y", () => {
    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-07"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-08"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2020-08-09"), "2019-08-08");

    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-07"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-08"), "2019-08-08");
    assertEquals(closestRep({ d: "2019-08-08", freq: "2Y" }, "2021-08-09"), "2021-08-08");

    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-07"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-08"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2021-08-09"), "2020-08-08");

    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-07"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-08"), "2020-08-08");
    assertEquals(closestRep({ d: "2020-08-08", freq: "2Y" }, "2022-08-09"), "2022-08-08");
});

it("closestRep undefined", () => {
    assertEquals(closestRep({ d: "2000-01-01", freq: undefined }, "2023-08-01"), undefined);
});

it("closestRep before date", () => {
    assertEquals(closestRep({ d: "2000-01-01", freq: "1D" }, "1999-12-31"), undefined);
    assertEquals(closestRep({ d: "2000-01-01", freq: "1D" }, "2000-01-01"), undefined);
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-05-31"), undefined);
    assertEquals(closestRep({ d: "2023-06-01", freq: "2D" }, "2023-06-01"), undefined);
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-02"), undefined);
    assertEquals(closestRep({ d: "2023-07-03", freq: "1W" }, "2023-07-03"), undefined);
    assertEquals(closestRep({ d: "2020-04-13", freq: "1M" }, "2020-04-12"), undefined);
    assertEquals(closestRep({ d: "2020-04-13", freq: "1M" }, "2020-04-13"), undefined);
    assertEquals(closestRep({ d: "2008-04-13", freq: "3M" }, "2008-04-12"), undefined);
    assertEquals(closestRep({ d: "2008-04-13", freq: "3M" }, "2008-04-13"), undefined);
    assertEquals(closestRep({ d: "2009-10-13", freq: "6M" }, "2009-10-12"), undefined);
    assertEquals(closestRep({ d: "2009-10-13", freq: "6M" }, "2009-10-13"), undefined);
    assertEquals(closestRep({ d: "2010-06-13", freq: "1Y" }, "2010-06-13"), undefined);
    assertEquals(closestRep({ d: "2010-06-13", freq: "1Y" }, "2010-06-13"), undefined);
    assertEquals(closestRep({ d: "2011-04-13", freq: "2Y" }, "2011-04-13"), undefined);
    assertEquals(closestRep({ d: "2011-04-13", freq: "2Y" }, "2011-04-13"), undefined);
});

it("rep 1D", () => {
    assertEquals(rep({ d: "1999-12-31", freq: "1D" }), "2000-01-01");
    assertEquals(rep({ d: "2000-01-01", freq: "1D" }), "2000-01-02");
    assertEquals(rep({ d: "2020-02-28", freq: "1D" }), "2020-02-29");
    assertEquals(rep({ d: "2020-02-29", freq: "1D" }), "2020-03-01");
    assertEquals(rep({ d: "2021-02-28", freq: "1D" }), "2021-03-01");
    assertEquals(rep({ d: "2021-03-01", freq: "1D" }), "2021-03-02");
});

it("rep 2D", () => {
    assertEquals(rep({ d: "1999-12-31", freq: "2D" }), "2000-01-02");
    assertEquals(rep({ d: "2000-01-01", freq: "2D" }), "2000-01-03");
    assertEquals(rep({ d: "2020-02-27", freq: "2D" }), "2020-02-29");
    assertEquals(rep({ d: "2020-02-28", freq: "2D" }), "2020-03-01");
    assertEquals(rep({ d: "2020-02-29", freq: "2D" }), "2020-03-02");
    assertEquals(rep({ d: "2021-02-27", freq: "2D" }), "2021-03-01");
    assertEquals(rep({ d: "2021-02-28", freq: "2D" }), "2021-03-02");
    assertEquals(rep({ d: "2021-03-01", freq: "2D" }), "2021-03-03");
});

it("rep 1W", () => {
    assertEquals(rep({ d: "1999-12-24", freq: "1W" }), "1999-12-31");
    assertEquals(rep({ d: "1999-12-25", freq: "1W" }), "2000-01-01");
    assertEquals(rep({ d: "2000-01-01", freq: "1W" }), "2000-01-08");
    assertEquals(rep({ d: "2020-02-21", freq: "1W" }), "2020-02-28");
    assertEquals(rep({ d: "2020-02-22", freq: "1W" }), "2020-02-29");
    assertEquals(rep({ d: "2020-02-23", freq: "1W" }), "2020-03-01");
    assertEquals(rep({ d: "2020-02-24", freq: "1W" }), "2020-03-02");
    assertEquals(rep({ d: "2021-02-21", freq: "1W" }), "2021-02-28");
    assertEquals(rep({ d: "2021-02-22", freq: "1W" }), "2021-03-01");
    assertEquals(rep({ d: "2021-02-23", freq: "1W" }), "2021-03-02");
    assertEquals(rep({ d: "2021-02-24", freq: "1W" }), "2021-03-03");
});

it("rep 1M", () => {
    assertEquals(rep({ d: "2000-01-01", freq: "1M" }), "2000-02-01");
    assertEquals(rep({ d: "2019-01-28", freq: "1M" }), "2019-02-28");
    assertEquals(rep({ d: "2019-01-29", freq: "1M" }), "2019-02-28");
    assertEquals(rep({ d: "2019-01-30", freq: "1M" }), "2019-02-28");
    assertEquals(rep({ d: "2019-01-31", freq: "1M" }), "2019-02-28");
    assertEquals(rep({ d: "2020-01-28", freq: "1M" }), "2020-02-28");
    assertEquals(rep({ d: "2020-01-29", freq: "1M" }), "2020-02-29");
    assertEquals(rep({ d: "2020-01-30", freq: "1M" }), "2020-02-29");
    assertEquals(rep({ d: "2020-01-31", freq: "1M" }), "2020-02-29");
    assertEquals(rep({ d: "2020-01-31", freq: "1M" }), "2020-02-29");
    assertEquals(rep({ d: "2020-02-29", freq: "1M" }), "2020-03-29");
    assertEquals(rep({ d: "2020-03-31", freq: "1M" }), "2020-04-30");
    assertEquals(rep({ d: "2020-04-30", freq: "1M" }), "2020-05-30");
});

it("rep 3M", () => {
    assertEquals(rep({ d: "1999-11-30", freq: "3M" }), "2000-02-29");
    assertEquals(rep({ d: "2000-02-29", freq: "3M" }), "2000-05-29");
    assertEquals(rep({ d: "2000-05-29", freq: "3M" }), "2000-08-29");
    assertEquals(rep({ d: "2000-08-29", freq: "3M" }), "2000-11-29");
    assertEquals(rep({ d: "2020-01-31", freq: "3M" }), "2020-04-30");
    assertEquals(rep({ d: "2020-02-29", freq: "3M" }), "2020-05-29");
    assertEquals(rep({ d: "2020-03-31", freq: "3M" }), "2020-06-30");
    assertEquals(rep({ d: "2020-04-30", freq: "3M" }), "2020-07-30");
});

it("rep 6M", () => {
    assertEquals(rep({ d: "1999-08-31", freq: "6M" }), "2000-02-29");
    assertEquals(rep({ d: "2000-02-29", freq: "6M" }), "2000-08-29");
    assertEquals(rep({ d: "2000-08-29", freq: "6M" }), "2001-02-28");
    assertEquals(rep({ d: "2001-02-28", freq: "6M" }), "2001-08-28");
    assertEquals(rep({ d: "2020-01-31", freq: "6M" }), "2020-07-31");
    assertEquals(rep({ d: "2020-02-29", freq: "6M" }), "2020-08-29");
    assertEquals(rep({ d: "2020-03-31", freq: "6M" }), "2020-09-30");
    assertEquals(rep({ d: "2020-04-30", freq: "6M" }), "2020-10-30");
});

it("rep 1Y", () => {
    assertEquals(rep({ d: "2000-01-01", freq: "1Y" }), "2001-01-01");
    assertEquals(rep({ d: "2019-02-28", freq: "1Y" }), "2020-02-28");
    assertEquals(rep({ d: "2020-02-28", freq: "1Y" }), "2021-02-28");
    assertEquals(rep({ d: "2021-02-28", freq: "1Y" }), "2022-02-28");
    assertEquals(rep({ d: "2019-02-28", freq: "1Y" }), "2020-02-28");
    assertEquals(rep({ d: "2020-02-29", freq: "1Y" }), "2021-02-28");
    assertEquals(rep({ d: "2021-02-28", freq: "1Y" }), "2022-02-28");
    assertEquals(rep({ d: "2019-06-30", freq: "1Y" }), "2020-06-30");
    assertEquals(rep({ d: "2020-06-30", freq: "1Y" }), "2021-06-30");
    assertEquals(rep({ d: "2021-06-30", freq: "1Y" }), "2022-06-30");
    assertEquals(rep({ d: "2019-08-31", freq: "1Y" }), "2020-08-31");
    assertEquals(rep({ d: "2020-08-31", freq: "1Y" }), "2021-08-31");
    assertEquals(rep({ d: "2021-08-31", freq: "1Y" }), "2022-08-31");
});

it("rep 2Y", () => {
    assertEquals(rep({ d: "2000-01-01", freq: "2Y" }), "2002-01-01");
    assertEquals(rep({ d: "2018-02-28", freq: "2Y" }), "2020-02-28");
    assertEquals(rep({ d: "2019-02-28", freq: "2Y" }), "2021-02-28");
    assertEquals(rep({ d: "2020-02-28", freq: "2Y" }), "2022-02-28");
    assertEquals(rep({ d: "2021-02-28", freq: "2Y" }), "2023-02-28");
    assertEquals(rep({ d: "2018-02-28", freq: "2Y" }), "2020-02-28");
    assertEquals(rep({ d: "2019-02-28", freq: "2Y" }), "2021-02-28");
    assertEquals(rep({ d: "2020-02-29", freq: "2Y" }), "2022-02-28");
    assertEquals(rep({ d: "2021-02-28", freq: "2Y" }), "2023-02-28");
    assertEquals(rep({ d: "2018-06-30", freq: "2Y" }), "2020-06-30");
    assertEquals(rep({ d: "2019-06-30", freq: "2Y" }), "2021-06-30");
    assertEquals(rep({ d: "2020-06-30", freq: "2Y" }), "2022-06-30");
    assertEquals(rep({ d: "2021-06-30", freq: "2Y" }), "2023-06-30");
    assertEquals(rep({ d: "2018-08-31", freq: "2Y" }), "2020-08-31");
    assertEquals(rep({ d: "2019-08-31", freq: "2Y" }), "2021-08-31");
    assertEquals(rep({ d: "2020-08-31", freq: "2Y" }), "2022-08-31");
    assertEquals(rep({ d: "2021-08-31", freq: "2Y" }), "2023-08-31");
});

it("rep undefined", () => {
    assertEquals(rep({ d: "2000-01-01", freq: undefined }), undefined);
});

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
    assert.deepEqual(
        repInPeriod({ d: "2023-07-20", freq: "1D" }, "2023-07-01", "2023-07-31"),
        [
            "2023-07-20",
            "2023-07-21",
            "2023-07-22",
            "2023-07-23",
            "2023-07-24",
            "2023-07-25",
            "2023-07-26",
            "2023-07-27",
            "2023-07-28",
            "2023-07-29",
            "2023-07-30",
            "2023-07-31",
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
    assert.deepEqual(
        repInPeriod({ d: "2023-07-20", freq: "2D" }, "2023-07-01", "2023-07-31"),
        ["2023-07-20", "2023-07-22", "2023-07-24", "2023-07-26", "2023-07-28", "2023-07-30"],
    );
});

it("repInPeriod 1W", () => {
    assert.deepEqual(
        repInPeriod({ d: "2023-07-01", freq: "1W" }, "2023-08-01", "2023-08-31"),
        ["2023-08-05", "2023-08-12", "2023-08-19", "2023-08-26"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2023-08-16", freq: "1W" }, "2023-08-01", "2023-08-31"),
        ["2023-08-16", "2023-08-23", "2023-08-30"],
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
    assert.deepEqual(
        repInPeriod({ d: "2023-08-10", freq: "1M" }, "2023-08-01", "2023-08-31"),
        ["2023-08-10"],
    );
});

it("repInPeriod 3M", () => {
    assert.deepEqual(repInPeriod({ d: "2020-01-28", freq: "3M" }, "2020-03-01", "2020-03-31"), []);
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
    assert.deepEqual(
        repInPeriod({ d: "2020-04-10", freq: "3M" }, "2020-04-01", "2020-04-30"),
        ["2020-04-10"],
    );
});

it("repInPeriod 6M", () => {
    assert.deepEqual(repInPeriod({ d: "2020-01-31", freq: "6M" }, "2020-03-01", "2020-03-31"), []);
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "6M" }, "2020-07-01", "2020-07-31"),
        ["2020-07-31"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-07-31", freq: "6M" }, "2021-01-01", "2021-01-31"),
        ["2021-01-31"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2023-06-29", freq: "6M" }, "2023-06-01", "2023-06-30"),
        ["2023-06-29"],
    );
});

it("repInPeriod 1Y", () => {
    assert.deepEqual(repInPeriod({ d: "2019-02-28", freq: "1Y" }, "2020-01-01", "2020-01-31"), []);
    assert.deepEqual(
        repInPeriod({ d: "2019-02-28", freq: "1Y" }, "2025-02-01", "2025-02-28"),
        ["2025-02-28"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-02-29", freq: "1Y" }, "2025-02-01", "2025-02-28"),
        ["2025-02-28"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2021-02-28", freq: "1Y" }, "2025-02-01", "2025-02-28"),
        ["2025-02-28"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2022-02-28", freq: "1Y" }, "2025-02-01", "2025-02-28"),
        ["2025-02-28"],
    );

    assert.deepEqual(
        repInPeriod({ d: "2021-11-11", freq: "1Y" }, "2021-11-01", "2021-11-30"),
        ["2021-11-11"],
    );
});

it("repInPeriod 2Y", () => {
    assert.deepEqual(repInPeriod({ d: "2020-01-31", freq: "2Y" }, "2020-07-01", "2020-07-30"), []);
    assert.deepEqual(
        repInPeriod({ d: "2020-01-31", freq: "2Y" }, "2022-01-01", "2022-01-31"),
        ["2022-01-31"],
    );
    assert.deepEqual(
        repInPeriod({ d: "2020-07-15", freq: "2Y" }, "2020-07-01", "2021-07-31"),
        ["2020-07-15"],
    );
});

it("closestRep undefined", () => {
    assert.deepEqual(
        repInPeriod({ d: "2000-01-01", freq: undefined }, "2023-08-01", "2023-08-31"),
        [],
    );
    assert.deepEqual(
        repInPeriod({ d: "2023-08-22", freq: undefined }, "2023-08-01", "2023-08-31"),
        ["2023-08-22"],
    );
});

it("closestRep between repetition", () => {
    assert.deepEqual(repInPeriod({ d: "2008-03-01", freq: "3M" }, "2008-04-01", "2008-04-30"), []);
    assert.deepEqual(repInPeriod({ d: "2009-04-01", freq: "6M" }, "2009-08-01", "2009-08-31"), []);
    assert.deepEqual(repInPeriod({ d: "2010-05-01", freq: "1Y" }, "2011-04-01", "2011-04-30"), []);
    assert.deepEqual(repInPeriod({ d: "2011-06-01", freq: "2Y" }, "2012-06-01", "2012-06-30"), []);
});

it("closestRep before date", () => {
    assert.deepEqual(repInPeriod({ d: "2000-01-01", freq: "1D" }, "1999-12-01", "1999-12-31"), []);
    assert.deepEqual(repInPeriod({ d: "2023-06-01", freq: "2D" }, "2023-05-01", "2023-05-31"), []);
    assert.deepEqual(repInPeriod({ d: "2023-07-01", freq: "1W" }, "2023-06-01", "2023-06-30"), []);
    assert.deepEqual(repInPeriod({ d: "2021-04-01", freq: "1M" }, "2021-03-01", "2021-03-31"), []);
    assert.deepEqual(repInPeriod({ d: "2008-03-01", freq: "3M" }, "2008-02-01", "2008-02-29"), []);
    assert.deepEqual(repInPeriod({ d: "2009-10-01", freq: "6M" }, "2009-09-01", "2009-09-30"), []);
    assert.deepEqual(repInPeriod({ d: "2010-09-01", freq: "1Y" }, "2010-08-01", "2010-08-31"), []);
    assert.deepEqual(repInPeriod({ d: "2011-08-01", freq: "2Y" }, "2011-07-01", "2011-07-31"), []);
});

it("repLazy 1D", () => {
    const it = repLazy({ d: "2000-01-01", freq: "1D" });

    assertEquals(it.next().value, "2000-01-02");
    assertEquals(it.next().value, "2000-01-03");
    assertEquals(it.next().value, "2000-01-04");
    assertEquals(it.next().value, "2000-01-05");
    assertEquals(it.next().value, "2000-01-06");
});

it("repLazy 1D", () => {
    const it = repLazy({ d: "2020-02-27", freq: "1D" });

    assertEquals(it.next().value, "2020-02-28");
    assertEquals(it.next().value, "2020-02-29");
    assertEquals(it.next().value, "2020-03-01");
    assertEquals(it.next().value, "2020-03-02");
});

it("repLazy 1D", () => {
    const it = repLazy({ d: "2021-02-27", freq: "1D" });

    assertEquals(it.next().value, "2021-02-28");
    assertEquals(it.next().value, "2021-03-01");
    assertEquals(it.next().value, "2021-03-02");
});

it("repLazy 2D", () => {
    const it = repLazy({ d: "2000-01-01", freq: "2D" });

    assertEquals(it.next().value, "2000-01-03");
    assertEquals(it.next().value, "2000-01-05");
    assertEquals(it.next().value, "2000-01-07");
    assertEquals(it.next().value, "2000-01-09");
    assertEquals(it.next().value, "2000-01-11");
});

it("repLazy 2D", () => {
    const it = repLazy({ d: "2020-02-27", freq: "2D" });

    assertEquals(it.next().value, "2020-02-29");
    assertEquals(it.next().value, "2020-03-02");
});

it("repLazy 2D", () => {
    const it = repLazy({ d: "2021-02-27", freq: "2D" });

    assertEquals(it.next().value, "2021-03-01");
});

it("repLazy 1W", () => {
    const it = repLazy({ d: "2000-01-01", freq: "1W" });

    assertEquals(it.next().value, "2000-01-08");
    assertEquals(it.next().value, "2000-01-15");
    assertEquals(it.next().value, "2000-01-22");
    assertEquals(it.next().value, "2000-01-29");
    assertEquals(it.next().value, "2000-02-05");
});

it("repLazy 1W", () => {
    const it = repLazy({ d: "2020-02-21", freq: "1W" });

    assertEquals(it.next().value, "2020-02-28");
    assertEquals(it.next().value, "2020-03-06");
});

it("repLazy 1W", () => {
    const it = repLazy({ d: "2021-02-21", freq: "1W" });

    assertEquals(it.next().value, "2021-02-28");
    assertEquals(it.next().value, "2021-03-07");
});

it("repLazy 1M", () => {
    const it = repLazy({ d: "2000-01-01", freq: "1M" });

    assertEquals(it.next().value, "2000-02-01");
    assertEquals(it.next().value, "2000-03-01");
    assertEquals(it.next().value, "2000-04-01");
    assertEquals(it.next().value, "2000-05-01");
    assertEquals(it.next().value, "2000-06-01");
});

it("repLazy 1M", () => {
    const it = repLazy({ d: "2020-01-31", freq: "1M" });

    assertEquals(it.next().value, "2020-02-29");
    assertEquals(it.next().value, "2020-03-31");
});

it("repLazy 1M", () => {
    const it = repLazy({ d: "2021-01-31", freq: "1M" });

    assertEquals(it.next().value, "2021-02-28");
    assertEquals(it.next().value, "2021-03-31");
});

it("repLazy 3M", () => {
    const it = repLazy({ d: "2000-01-01", freq: "3M" });

    assertEquals(it.next().value, "2000-04-01");
    assertEquals(it.next().value, "2000-07-01");
    assertEquals(it.next().value, "2000-10-01");
    assertEquals(it.next().value, "2001-01-01");
    assertEquals(it.next().value, "2001-04-01");
});

it("repLazy 3M", () => {
    const it = repLazy({ d: "2019-11-30", freq: "3M" });
    assertEquals(it.next().value, "2020-02-29");
    assertEquals(it.next().value, "2020-05-30");
    assertEquals(it.next().value, "2020-08-30");
    assertEquals(it.next().value, "2020-11-30");
});

it("repLazy 6M", () => {
    const it = repLazy({ d: "2000-01-01", freq: "6M" });
    assertEquals(it.next().value, "2000-07-01");
    assertEquals(it.next().value, "2001-01-01");
    assertEquals(it.next().value, "2001-07-01");
    assertEquals(it.next().value, "2002-01-01");
    assertEquals(it.next().value, "2002-07-01");
});

it("repLazy 6M", () => {
    const it = repLazy({ d: "2019-08-31", freq: "6M" });
    assertEquals(it.next().value, "2020-02-29");
    assertEquals(it.next().value, "2020-08-31");
    assertEquals(it.next().value, "2021-02-28");
    assertEquals(it.next().value, "2021-08-31");
});

it("repLazy 1Y", () => {
    const it = repLazy({ d: "2000-01-01", freq: "1Y" });
    assertEquals(it.next().value, "2001-01-01");
    assertEquals(it.next().value, "2002-01-01");
    assertEquals(it.next().value, "2003-01-01");
    assertEquals(it.next().value, "2004-01-01");
    assertEquals(it.next().value, "2005-01-01");
});

it("repLazy 1Y", () => {
    const it = repLazy({ d: "2020-02-29", freq: "1Y" });
    assertEquals(it.next().value, "2021-02-28");
    assertEquals(it.next().value, "2022-02-28");
    assertEquals(it.next().value, "2023-02-28");
    assertEquals(it.next().value, "2024-02-29");
});

it("repLazy 2Y", () => {
    const it = repLazy({ d: "2000-01-01", freq: "2Y" });
    assertEquals(it.next().value, "2002-01-01");
    assertEquals(it.next().value, "2004-01-01");
    assertEquals(it.next().value, "2006-01-01");
    assertEquals(it.next().value, "2008-01-01");
    assertEquals(it.next().value, "2010-01-01");
});

it("repLazy 2Y", () => {
    const it = repLazy({ d: "2020-02-29", freq: "2Y" });
    assertEquals(it.next().value, "2022-02-28");
    assertEquals(it.next().value, "2024-02-29");
});

it("repLazy undefined", () => {
    const it = repLazy({ d: "2000-01-01", freq: undefined });
    assertEquals(it.next().value, undefined);
    assertEquals(it.next().value, undefined);
    assertEquals(it.next().value, undefined);
    assertEquals(it.next().value, undefined);
    assertEquals(it.next().value, undefined);
});
