import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import {
    meetingCreateStub,
    meetingStub,
    meetingUpdateStub,
} from "../../../domain/schedule/event/meeting/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { created, noContent } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { meetingCreateController, meetingUpdateController } from "./meeting.ts";

Deno.test("meetingCreateController", async () => {
    assertEquals(
        await meetingCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("meeting-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(meetingCreateStub, {}),
        ),
        created(meetingStub),
    );
});

Deno.test("meetingUpdateController", async () => {
    assertEquals(
        await meetingUpdateController(
            eventRepoOneStubBuild(meetingStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(meetingUpdateStub, { id: "meeting-id" }),
        ),
        noContent(),
    );
});
