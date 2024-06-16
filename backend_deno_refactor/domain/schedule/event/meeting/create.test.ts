import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import { meetingCreateStub, meetingEventCreateStub, meetingStub } from "./model.stub.ts";
import { meetingCreate, meetingCreateToEventCreate } from "./create.ts";

Deno.test("meetingCreateToEventCreate", () => {
    assertEquals(
        meetingCreateToEventCreate(meetingCreateStub),
        meetingEventCreateStub,
    );
});

Deno.test("meetingCreate", async () => {
    assertEquals(
        await meetingCreate(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("meeting-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            meetingCreateStub,
        ),
        ok(meetingStub),
    );
});
