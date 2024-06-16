import type { BirthdayCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { birthdayCreate, birthdayCreateToEventCreate } from "./create.ts";

const birthdayCreateModelStub: BirthdayCreateModel = {
    name: "name",
    day: "2023-06-24",
};

Deno.test("birthdayCreateToEventCreate", () => {
    assertEquals(
        birthdayCreateToEventCreate(birthdayCreateModelStub),
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

Deno.test("birthdayCreate", async () => {
    assertEquals(
        await birthdayCreate(
            new ValidatorStub(),
            eventStub.user,
            birthdayCreateModelStub,
        ),
        ok(eventStub),
    );
});
