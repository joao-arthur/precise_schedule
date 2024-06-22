import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import { meetingCreateStub, meetingEventCreateStub, meetingStub } from "./model.stub.ts";
import { meetingCreateService, meetingCreateToEventCreate } from "./create.ts";

Deno.test("meetingCreateToEventCreate", () => {
    assertEquals(
        meetingCreateToEventCreate(meetingCreateStub),
        meetingEventCreateStub,
    );
});

Deno.test("meetingCreateService", async () => {
    assertEquals(
        await meetingCreateService(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("meeting-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            meetingCreateStub,
        ),
        ok(meetingStub),
    );
});
