import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { EventCreateServiceStub } from "./service._stub.ts";

Deno.test("EventCreateServiceStub", async () => {
    assertEquals(
        await new EventCreateServiceStub(eventStub).create(),
        eventStub,
    );
});
