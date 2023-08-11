import { assert, it } from "vitest";
import { toEvent } from "./toEvent";

it("toEvent", () => {
    assert.deepEqual(
        toEvent({
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            frequency: "1D",
            weekendRepeat: false,
        }),
        {
            id: "abcdefg",
            name: "Final date",
            day: "2018-12-10",
            begin: "09:00",
            end: "17:00",
            category: "MEETING",
            frequency: "1D",
            weekendRepeat: false,
        },
    );
});
