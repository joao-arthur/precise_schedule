import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../../model._stub.ts";
import { PartyUpdateServiceStub } from "./service._stub.ts";

Deno.test("PartyUpdateServiceStub", async () => {
    assertEquals(
        await new PartyUpdateServiceStub(
            eventStub,
        ).update(),
        eventStub,
    );
});
