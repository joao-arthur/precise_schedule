import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { partyCreateModelStub } from "./model._stub.ts";
import { partyCreate } from "./service.ts";

Deno.test("partyCreate", async () => {
    assertEquals(
        await partyCreate(
            new ValidatorStub(),
            eventStub.user,
            partyCreateModelStub,
        ),
        ok(eventStub),
    );
});
