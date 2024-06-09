import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../../model._stub.ts";
import { PartyCreateServiceStub } from "./service._stub.ts";

Deno.test("PartyCreateServiceStub", async () => {
    assertEquals(
        await new PartyCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
