import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../model._stub.ts";
import { EventUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("EventUpdateFactoryStub", () => {
    assertEquals(
        new EventUpdateFactoryStub(eventStub).build(),
        eventStub,
    );
});
