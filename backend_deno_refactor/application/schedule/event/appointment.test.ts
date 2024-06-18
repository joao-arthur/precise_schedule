import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import {
    appointmentCreateStub,
    appointmentStub,
    appointmentUpdateStub,
} from "../../../domain/schedule/event/appointment/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { created, noContent } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { appointmentCreateController, appointmentUpdateController } from "./appointment.ts";

Deno.test("appointmentCreateController", async () => {
    assertEquals(
        await appointmentCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("appointment-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(appointmentCreateStub, {}),
        ),
        created(appointmentStub),
    );
});

Deno.test("appointmentUpdateController", async () => {
    assertEquals(
        await appointmentUpdateController(
            eventRepoOneStubBuild(appointmentStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(appointmentUpdateStub, { id: "appointment-id" }),
        ),
        noContent(),
    );
});
