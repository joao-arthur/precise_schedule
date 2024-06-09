import { assertEquals } from "std/assert/assert_equals.ts";
import { dateCreateModelStub } from "./model._stub.ts";
import { DateCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("DateCreateFactoryImpl", () => {
    assertEquals(
        new DateCreateFactoryImpl().build(dateCreateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateCreateModelStub,
        },
    );
});
