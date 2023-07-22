import { assertEquals } from "std/testing/asserts.ts";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { BirthdayUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("BirthdayUpdateFactoryImpl", () => {
    assertEquals(
        new BirthdayUpdateFactoryImpl().build(birthdayUpdateModelStub),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1_Y",
            weekendRepeat: false,
            ...birthdayUpdateModelStub,
        },
    );
});
