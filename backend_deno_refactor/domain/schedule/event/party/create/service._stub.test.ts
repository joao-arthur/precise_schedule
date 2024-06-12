import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { PartyCreateServiceStub } from "./service._stub.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("PartyCreateServiceStub", async () => {
    assertEquals(
        await new PartyCreateServiceStub(eventStub).create(),
        ok(eventStub),
    );
});
