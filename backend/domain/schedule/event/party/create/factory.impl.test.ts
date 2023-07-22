import { assertEquals } from "std/testing/asserts.ts";
import { partyCreateModelStub } from "./model._stub.ts";
import { PartyCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("PartyCreateFactoryImpl", () => {
    assertEquals(
        new PartyCreateFactoryImpl().build(
            partyCreateModelStub,
        ),
        {
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
            ...partyCreateModelStub,
        },
    );
});
