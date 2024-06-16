import type { DateUpdateModel } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { dateUpdate, dateUpdateToEventUpdate } from "./update.ts";

const dateUpdateModelStub: DateUpdateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
};

Deno.test("dateUpdateToEventUpdate", () => {
    assertEquals(
        dateUpdateToEventUpdate(dateUpdateModelStub),
        {
            category: "DATE",
            frequency: undefined,
            weekendRepeat: false,
            ...dateUpdateModelStub,
        },
    );
});

Deno.test("dateUpdate", async () => {
    assertEquals(
        await dateUpdate(
            eventStub.user,
            eventStub.id,
            dateUpdateModelStub,
        ),
        ok(eventStub),
    );
});
