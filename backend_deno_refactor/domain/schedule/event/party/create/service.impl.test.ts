import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { partyCreateModelStub } from "./model._stub.ts";
import { PartyCreateFactoryStub } from "./factory._stub.ts";
import { PartyCreateServiceImpl } from "./service.impl.ts";
import { buildOk } from "../../../../lang/result.ts";

Deno.test("PartyCreateServiceImpl", async () => {
    assertEquals(
        await new PartyCreateServiceImpl(
            new ValidatorStub(),
            new PartyCreateFactoryStub(eventStub),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, partyCreateModelStub),
        buildOk(eventStub),
    );
});
