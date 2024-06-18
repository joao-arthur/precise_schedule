import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    appointmentCreateStub,
    appointmentStub,
} from "../../../../domain/schedule/event/appointment/model.stub.ts";
import { created } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { appointmentCreateController } from "./create.ts";
import { eventRepoEmptyStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
