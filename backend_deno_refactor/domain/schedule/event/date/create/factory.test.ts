import { assertEquals } from "@std/assert/assert-equals";
import { dateCreateModelStub } from "./model._stub.ts";
import { buildEventCreate } from "./factory.ts";

Deno.test("buildEventCreate", () => {
    assertEquals(
        buildEventCreate(dateCreateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateCreateModelStub,
        },
    );
});
