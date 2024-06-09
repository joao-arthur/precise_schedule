import { assertEquals } from "@std/assert/assert-equals";
import { dateUpdateModelStub } from "./model._stub.ts";
import { DateUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("DateUpdateFactoryImpl", () => {
    assertEquals(
        new DateUpdateFactoryImpl().build(dateUpdateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateUpdateModelStub,
        },
    );
});
