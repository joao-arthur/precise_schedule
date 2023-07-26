import { expect, it } from "vitest";
import { getNextOccurence } from "./getNextOccurence.js";

const commom = {
    id: "1",
    name: "nome",
    category: "APPOINTMENT",
    begin: "00:00",
    end: "23:59",
    weekendRepeat: false,
} as const;

it("getNextOccurence 1_D", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "1_D" })).toBe("2000-01-02");
});

it("getNextOccurence 2_D", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "2_D" })).toBe("2000-01-03");
});

it("getNextOccurence 1_W", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "1_W" })).toBe("2000-01-08");
});

it("getNextOccurence 1_M", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "1_M" })).toBe("2000-02-01");

    expect(getNextOccurence({ ...commom, day: "2019-01-28", frequency: "1_M" })).toBe("2019-02-28");
    expect(getNextOccurence({ ...commom, day: "2019-01-29", frequency: "1_M" })).toBe("2019-02-28");
    expect(getNextOccurence({ ...commom, day: "2019-01-30", frequency: "1_M" })).toBe("2019-02-28");
    expect(getNextOccurence({ ...commom, day: "2019-01-31", frequency: "1_M" })).toBe("2019-02-28");

    expect(getNextOccurence({ ...commom, day: "2020-01-28", frequency: "1_M" })).toBe("2020-02-28");
    expect(getNextOccurence({ ...commom, day: "2020-01-29", frequency: "1_M" })).toBe("2020-02-29");
    expect(getNextOccurence({ ...commom, day: "2020-01-30", frequency: "1_M" })).toBe("2020-02-29");
    expect(getNextOccurence({ ...commom, day: "2020-01-31", frequency: "1_M" })).toBe("2020-02-29");
});

it("getNextOccurence 3_M", () => {
    expect(getNextOccurence({ ...commom, day: "1999-11-30", frequency: "3_M" })).toBe("2000-02-29");
    expect(getNextOccurence({ ...commom, day: "2000-02-29", frequency: "3_M" })).toBe("2000-05-29");
    expect(getNextOccurence({ ...commom, day: "2000-05-29", frequency: "3_M" })).toBe("2000-08-29");
    expect(getNextOccurence({ ...commom, day: "2000-08-29", frequency: "3_M" })).toBe("2000-11-29");
});

it("getNextOccurence 6_M", () => {
    expect(getNextOccurence({ ...commom, day: "1999-08-31", frequency: "6_M" })).toBe("2000-02-29");
    expect(getNextOccurence({ ...commom, day: "2000-02-29", frequency: "6_M" })).toBe("2000-08-29");
});

it("getNextOccurence 1_Y", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "1_Y" })).toBe("2001-01-01");

    expect(getNextOccurence({ ...commom, day: "2019-02-28", frequency: "1_Y" })).toBe("2020-02-28");
    expect(getNextOccurence({ ...commom, day: "2020-02-29", frequency: "1_Y" })).toBe("2021-02-28");
    expect(getNextOccurence({ ...commom, day: "2021-02-28", frequency: "1_Y" })).toBe("2022-02-28");
});

it("getNextOccurence NEVER", () => {
    expect(getNextOccurence({ ...commom, day: "2000-01-01", frequency: "NEVER" })).toBe(undefined);
});
