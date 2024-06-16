import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { idGeneratorStubBuild } from "../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../generator/date.stub.ts";
import { eventRepoEmptyStubBuild } from "./repo.stub.ts";
import { eventCreate, eventCreateToEvent } from "./create.ts";
import { appointmentEventCreateStub, appointmentStub } from "./appointment/model.stub.ts";

Deno.test("eventCreateToEvent", () => {
    assertEquals(
        eventCreateToEvent(
            appointmentEventCreateStub,
            "event-id",
            "user-id",
            new Date("2024-06-16T19:16:12.327Z"),
        ),
        appointmentStub,
    );
});

Deno.test("eventCreate", async () => {
    assertEquals(
        await eventCreate(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("event-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            appointmentEventCreateStub,
            "user-id",
        ),
        ok(appointmentStub),
    );
});
