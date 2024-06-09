import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../model._stub.ts";
import { EventCreateFactoryStub } from "./factory._stub.ts";

Deno.test("EventCreateFactoryStub", () => {
    assertEquals(
        new EventCreateFactoryStub(eventStub).build(),
        eventStub,
    );
});
