import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { idGeneratorStubBuild } from "../../generator.stub.ts";
import { dateGeneratorStubBuild } from "../../generator.stub.ts";
import { eventRepoEmptyStubBuild } from "./repo.stub.ts";
import { eventCreate, eventCreateToEvent } from "./create.ts";
import { appointmentEventCreateStub, appointmentStub } from "./appointment/model.stub.ts";

Deno.test("eventCreateToEvent", () => {
    assertEquals(
        eventCreateToEvent(
            appointmentEventCreateStub,
            "appointment-id",
            "user-id",
            new Date("2024-06-16T19:16:12.327Z"),
        ),
        appointmentStub,
    );
});
``;

Deno.test("eventCreate", async () => {
    assertEquals(
        await eventCreate(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("appointment-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            appointmentEventCreateStub,
            "user-id",
        ),
        ok(appointmentStub),
    );
});
