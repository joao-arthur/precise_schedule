import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { EventUpdateServiceStub } from "./service._stub.ts";

Deno.test("EventUpdateServiceStub", async () => {
    assertEquals(
        await new EventUpdateServiceStub(eventStub).update(),
        eventStub,
    );
});
