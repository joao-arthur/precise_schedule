import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    meetingCreateStub,
    meetingStub,
} from "../../../../domain/schedule/event/meeting/model.stub.ts";
import { created } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { meetingCreateController } from "./create.ts";
import { eventRepoEmptyStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
