import type { MeetingCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { meetingCreate, meetingCreateToEventCreate } from "./create.ts";

const meetingCreateModelStub: MeetingCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("meetingCreateToEventCreate", () => {
    assertEquals(
        meetingCreateToEventCreate(meetingCreateModelStub),
        {
            category: "MEETING",
            ...meetingCreateModelStub,
        },
    );
});

Deno.test("meetingCreate", async () => {
    assertEquals(
        await meetingCreate(
            new ValidatorStub(),
            eventStub.user,
            meetingCreateModelStub,
        ),
        ok(eventStub),
    );
});