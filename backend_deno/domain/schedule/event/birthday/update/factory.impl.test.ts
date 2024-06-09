import { assertEquals } from "std/assert/assert_equals.ts";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { BirthdayUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("BirthdayUpdateFactoryImpl", () => {
    assertEquals(
        new BirthdayUpdateFactoryImpl().build(birthdayUpdateModelStub),
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
