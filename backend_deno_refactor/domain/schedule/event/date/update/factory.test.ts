import { assertEquals } from "@std/assert/assert-equals";
import { dateUpdateModelStub } from "./model._stub.ts";
import { buildEventUpdate } from "./factory.ts";

Deno.test("buildEventUpdate", () => {
    assertEquals(
        buildEventUpdate(dateUpdateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateUpdateModelStub,
        },
    );
});
