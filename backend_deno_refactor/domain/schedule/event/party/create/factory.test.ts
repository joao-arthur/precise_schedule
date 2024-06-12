import { assertEquals } from "@std/assert/assert-equals";
import { partyCreateModelStub } from "./model._stub.ts";
import { buildEventCreate } from "./factory.ts";

Deno.test("PartyCreateFactoryImpl", () => {
    assertEquals(
        buildEventCreate(partyCreateModelStub),
        {
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
            ...partyCreateModelStub,
        },
    );
});
