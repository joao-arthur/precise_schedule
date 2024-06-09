import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { partyCreateModelStub } from "./model._stub.ts";
import { PartyCreateFactoryStub } from "./factory._stub.ts";
import { PartyCreateServiceImpl } from "./service.impl.ts";

Deno.test("PartyCreateServiceImpl", async () => {
    assertEquals(
        await new PartyCreateServiceImpl(
            new ValidatorStub(),
            new PartyCreateFactoryStub(eventStub),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, partyCreateModelStub),
        eventStub,
    );
});
