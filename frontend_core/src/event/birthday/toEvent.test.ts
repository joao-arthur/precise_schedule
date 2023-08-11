import { assert, it } from "vitest";
import { toEvent } from "./toEvent";

it("toEvent", () => {
    assert.deepEqual(
        toEvent({
            id: "abcdefg",
            name: "My birthday",
            day: "2000-08-22",
        }),
        {
            id: "abcdefg",
            name: "My birthday",
            day: "2000-08-22",
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1Y",
            weekendRepeat: false,
        },
    );
});
