import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { partyUpdateModelStub } from "./model._stub.ts";
import { PartyUpdateFactoryStub } from "./factory._stub.ts";
import { PartyUpdateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("PartyUpdateServiceImpl", async () => {
    assertEquals(
        await new PartyUpdateServiceImpl(
            new ValidatorStub(),
            new PartyUpdateFactoryStub(eventStub),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, partyUpdateModelStub),
        ok(eventStub),
    );
});
