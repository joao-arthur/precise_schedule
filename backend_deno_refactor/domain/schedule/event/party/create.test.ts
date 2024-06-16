import type { PartyCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { partyCreate, partyCreateToEventCreate } from "./create.ts";

const partyCreateModelStub: PartyCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
};

Deno.test("partyCreateToEventCreate", () => {
    assertEquals(
        partyCreateToEventCreate(partyCreateModelStub),
        {
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
            ...partyCreateModelStub,
        },
    );
});

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
