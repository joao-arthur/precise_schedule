import type { PartyUpdateModel } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { partyUpdate, partyUpdateToEventUpdate } from "./update.ts";

const partyUpdateModelStub: PartyUpdateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
};

Deno.test("partyUpdateToEventUpdate", () => {
    assertEquals(
        partyUpdateToEventUpdate(partyUpdateModelStub),
        {
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
            ...partyUpdateModelStub,
        },
    );
});

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
