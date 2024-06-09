import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../model._stub.ts";
import { EventCreateServiceStub } from "./service._stub.ts";

Deno.test("EventCreateServiceStub", async () => {
    assertEquals(
        await new EventCreateServiceStub(eventStub).create(),
        eventStub,
    );
});
