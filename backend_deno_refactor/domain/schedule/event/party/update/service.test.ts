import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { partyUpdateModelStub } from "./model._stub.ts";
import { partyUpdate } from "./service.ts";

Deno.test("partyUpdate", async () => {
    assertEquals(
        await partyUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            partyUpdateModelStub,
        ),
        ok(eventStub),
    );
});
