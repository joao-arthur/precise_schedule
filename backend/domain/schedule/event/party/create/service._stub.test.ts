import { assertEquals } from "std/testing/asserts.ts";
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
