import { assertEquals } from "std/testing/asserts.ts";
import { dateUpdateModelStub } from "./model._stub.ts";
import { DateUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("DateUpdateFactoryImpl", () => {
    assertEquals(
        new DateUpdateFactoryImpl().build(
            dateUpdateModelStub,
        ),
        {
            category: "DATE",
            frequency: "NEVER",
            weekendRepeat: false,
            ...dateUpdateModelStub,
        },
    );
});
