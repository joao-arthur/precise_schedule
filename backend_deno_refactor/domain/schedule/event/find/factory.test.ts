import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { buildEventFind } from "./factory.ts";

Deno.test("buildEventFind", () => {
    assertEquals(
        buildEventFind(eventStub),
        {
            id: eventStub.id,
            name: eventStub.name,
            day: eventStub.day,
            begin: eventStub.begin,
            end: eventStub.end,
            category: eventStub.category,
            frequency: eventStub.frequency,
            weekendRepeat: eventStub.weekendRepeat,
        },
    );
});
