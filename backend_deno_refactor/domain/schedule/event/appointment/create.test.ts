import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import {
    appointmentCreateStub,
    appointmentEventCreateStub,
    appointmentStub,
} from "./model.stub.ts";
import { appointmentCreate, appointmentCreateToEventCreate } from "./create.ts";

Deno.test("appointmentCreateToEventCreate", () => {
    assertEquals(
        appointmentCreateToEventCreate(appointmentCreateStub),
        appointmentEventCreateStub,
    );
});

Deno.test("appointmentCreate", async () => {
    assertEquals(
        await appointmentCreate(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("appointment-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            appointmentCreateStub,
        ),
        ok(appointmentStub),
    );
});
