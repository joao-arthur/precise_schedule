import type { BirthdayUpdate } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { birthdayUpdate, birthdayUpdateToEventUpdate } from "./update.ts";

const birthdayUpdateModelStub: BirthdayUpdate = {
    name: "name",
    day: "2025-06-24",
};

Deno.test("birthdayUpdateToEventUpdate", () => {
    assertEquals(
        birthdayUpdateToEventUpdate(birthdayUpdateModelStub),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1Y",
            weekendRepeat: true,
            ...birthdayUpdateModelStub,
        },
    );
});

Deno.test("birthdayUpdate", async () => {
    assertEquals(
        await birthdayUpdate(
            eventStub.user,
            eventStub.id,
            birthdayUpdateModelStub,
        ),
        ok(eventStub),
    );
});
