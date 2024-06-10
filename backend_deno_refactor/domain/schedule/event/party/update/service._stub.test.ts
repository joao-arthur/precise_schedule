import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { PartyUpdateServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../../lang/result.ts";

Deno.test("PartyUpdateServiceStub", async () => {
    assertEquals(
        await new PartyUpdateServiceStub(eventStub).update(),
        buildOk(eventStub),
    );
});
