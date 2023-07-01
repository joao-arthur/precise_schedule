import { describe, expect, it } from "vitest";
import { dateFns } from "./dateFns";

describe("dateFns", () => {
    it("Should verify date in between", () => {
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 10),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 11),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 12),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 10),
                new Date(2022, 10, 8),
                new Date(2022, 10, 14),
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 9),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
            ),
        ).toBe(false);
        expect(
            dateFns.isInBetween(
                new Date(2022, 10, 13),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
            ),
        ).toBe(false);
    });

    it("Should verify date in repetition", () => {
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 9),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
                { months: 1 },
            ),
        ).toBe(false);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 10),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 11),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 12),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 13),
                new Date(2022, 10, 10),
                new Date(2022, 10, 12),
                { months: 1 },
            ),
        ).toBe(false);

        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 9),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                { months: 1 },
            ),
        ).toBe(false);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 10),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 11),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 12),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                { months: 1 },
            ),
        ).toBe(true);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 13),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                { months: 1 },
            ),
        ).toBe(false);
        expect(
            dateFns.isInBetweenRepeat(
                new Date(2022, 10, 13),
                new Date(2022, 8, 10),
                new Date(2022, 8, 12),
                undefined,
            ),
        ).toBe(false);
    });
});
