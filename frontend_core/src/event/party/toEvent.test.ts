import { assert, it } from "vitest";
import { toEvent } from "./toEvent";

it("toEvent", () => {
    assert.deepEqual(
        toEvent({
            id: "abcdefg",
            name: "New Year Party",
            day: "2019-12-31",
            begin: "09:00",
            end: "17:00",
        }),
        {
            id: "abcdefg",
            name: "New Year Party",
            day: "2019-12-31",
            begin: "09:00",
            end: "17:00",
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
        },
    );
});
