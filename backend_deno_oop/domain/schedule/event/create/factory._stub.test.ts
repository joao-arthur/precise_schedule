import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { EventCreateFactoryStub } from "./factory._stub.ts";

Deno.test("EventCreateFactoryStub", () => {
    assertEquals(
        new EventCreateFactoryStub(eventStub).build(),
        eventStub,
    );
});
