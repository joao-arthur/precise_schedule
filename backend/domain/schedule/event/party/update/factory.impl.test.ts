import { assertEquals } from "std/testing/asserts.ts";
import { partyUpdateModelStub } from "./model._stub.ts";
import { PartyUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("PartyUpdateFactoryImpl", () => {
    assertEquals(
        new PartyUpdateFactoryImpl().build(partyUpdateModelStub),
        {
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
            ...partyUpdateModelStub,
        },
    );
});
