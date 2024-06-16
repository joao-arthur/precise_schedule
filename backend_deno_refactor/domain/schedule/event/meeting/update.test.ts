import type { MeetingUpdateModel } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { meetingUpdate, meetingUpdateToEventUpdate } from "./update.ts";

const meetingUpdateModelStub: MeetingUpdateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("meetingUpdateToEventUpdate", () => {
    assertEquals(
        meetingUpdateToEventUpdate(meetingUpdateModelStub),
        {
            category: "MEETING",
            ...meetingUpdateModelStub,
        },
    );
});

Deno.test("meetingUpdate", async () => {
    assertEquals(
        await meetingUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            meetingUpdateModelStub,
        ),
        ok(eventStub),
    );
});