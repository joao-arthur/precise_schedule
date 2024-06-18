import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    meetingStub,
    meetingUpdateStub,
} from "../../../../domain/schedule/event/meeting/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { meetingUpdateController } from "./update.ts";
import { eventRepoOneStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
