import type { DateCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { dateCreate, dateCreateToEventCreate } from "./create.ts";

const dateCreateModelStub: DateCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
};

Deno.test("dateCreateToEventCreate", () => {
    assertEquals(
        dateCreateToEventCreate(dateCreateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateCreateModelStub,
        },
    );
});

Deno.test("dateCreate", async () => {
    assertEquals(
        await dateCreate(
            eventStub.user,
            dateCreateModelStub,
        ),
        ok(eventStub),
    );
});
