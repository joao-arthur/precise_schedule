import { assertEquals } from "std/assert/assert_equals.ts";
import { EventFindFactoryImpl } from "./factory.impl.ts";
import { eventStub } from "../model._stub.ts";

Deno.test("EventFindFactoryImpl", () => {
    assertEquals(
        new EventFindFactoryImpl().build(eventStub),
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
