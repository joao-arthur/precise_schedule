import { assertEquals } from "@std/assert/assert-equals";
import { birthdayCreateModelStub } from "./model._stub.ts";
import { BirthdayCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("BirthdayCreateFactoryImpl", () => {
    assertEquals(
        new BirthdayCreateFactoryImpl().build(birthdayCreateModelStub),
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
