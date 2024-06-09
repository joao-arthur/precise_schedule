import { assertEquals } from "std/assert/assert_equals.ts";
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
