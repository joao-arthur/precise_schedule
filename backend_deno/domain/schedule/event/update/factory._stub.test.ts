import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../model._stub.ts";
import { EventUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("EventUpdateFactoryStub", () => {
    assertEquals(
        new EventUpdateFactoryStub(eventStub).build(),
        eventStub,
    );
});
