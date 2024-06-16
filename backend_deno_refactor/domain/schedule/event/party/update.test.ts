import type { PartyUpdate } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { partyUpdate, partyUpdateToEventUpdate } from "./update.ts";

const partyUpdateModelStub: PartyUpdate = {
    name: "name",
    day: "2025-06-24",
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
            eventStub.user,
            eventStub.id,
            partyUpdateModelStub,
        ),
        ok(eventStub),
    );
});
