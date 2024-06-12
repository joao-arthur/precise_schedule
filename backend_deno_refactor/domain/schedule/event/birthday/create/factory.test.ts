import { assertEquals } from "@std/assert/assert-equals";
import { birthdayCreateModelStub } from "./model._stub.ts";
import { buildEventCreate } from "./factory.ts";

Deno.test("buildEventCreate", () => {
    assertEquals(
        buildEventCreate(birthdayCreateModelStub),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1Y",
            weekendRepeat: false,
            ...birthdayCreateModelStub,
        },
    );
});
