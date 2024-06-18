import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    appointmentStub,
    appointmentUpdateStub,
} from "../../../../domain/schedule/event/appointment/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { appointmentUpdateController } from "./update.ts";
import { eventRepoOneStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
