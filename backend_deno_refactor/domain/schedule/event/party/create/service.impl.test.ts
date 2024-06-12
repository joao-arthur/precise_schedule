import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { partyCreateModelStub } from "./model._stub.ts";
import { PartyCreateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("PartyCreateServiceImpl", async () => {
    assertEquals(
        await new PartyCreateServiceImpl(
            new ValidatorStub(),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, partyCreateModelStub),
        ok(eventStub),
    );
});
