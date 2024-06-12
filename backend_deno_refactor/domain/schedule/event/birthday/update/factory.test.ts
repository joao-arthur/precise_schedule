import { assertEquals } from "@std/assert/assert-equals";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { buildEventUpdate } from "./factory.ts";

Deno.test("BirthdayUpdateFactoryImpl", () => {
    assertEquals(
        buildEventUpdate(birthdayUpdateModelStub),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1Y",
            weekendRepeat: false,
            ...birthdayUpdateModelStub,
        },
    );
});
