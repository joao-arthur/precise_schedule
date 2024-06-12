import { assertEquals } from "@std/assert/assert-equals";
import { partyUpdateModelStub } from "./model._stub.ts";
import { buildEventUpdate } from "./factory.ts";

Deno.test("PartyUpdateFactoryImpl", () => {
    assertEquals(
        buildEventUpdate(partyUpdateModelStub),
        {
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
            ...partyUpdateModelStub,
        },
    );
});
