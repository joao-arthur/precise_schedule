import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import {
    meetingEventUpdateStub,
    meetingStub,
    meetingUpdatedStub,
    meetingUpdateStub,
} from "./model.stub.ts";
import { eventRepoStubBuild } from "../repo.stub.ts";
import { meetingUpdateService, meetingUpdateToEventUpdate } from "./update.ts";

Deno.test("meetingUpdateToEventUpdate", () => {
    assertEquals(
        meetingUpdateToEventUpdate(meetingUpdateStub),
        meetingEventUpdateStub,
    );
});

Deno.test("meetingUpdateService", async () => {
    assertEquals(
        await meetingUpdateService(
            eventRepoStubBuild([], meetingStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "appointment-id",
            meetingUpdateStub,
        ),
        ok(meetingUpdatedStub),
    );
});
