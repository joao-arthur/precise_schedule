import { assertEquals } from "std/assert/assert_equals.ts";
import { partyUpdateModelStub } from "./model._stub.ts";
import { PartyUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("PartyUpdateFactoryImpl", () => {
    assertEquals(
        new PartyUpdateFactoryImpl().build(partyUpdateModelStub),
        {
            category: "PARTY",
            frequency: undefined,
            weekendRepeat: false,
            ...partyUpdateModelStub,
        },
    );
});
