import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator.stub.ts";
import {
    appointmentEventUpdateStub,
    appointmentStub,
    appointmentUpdatedStub,
    appointmentUpdateStub,
} from "./model.stub.ts";
import { eventRepoOneStubBuild } from "../repo.stub.ts";
import { appointmentUpdateService, appointmentUpdateToEventUpdate } from "./update.ts";

Deno.test("appointmentUpdateToEventUpdate", () => {
    assertEquals(
        appointmentUpdateToEventUpdate(appointmentUpdateStub),
        appointmentEventUpdateStub,
    );
});

Deno.test("appointmentUpdateService", async () => {
    assertEquals(
        await appointmentUpdateService(
            eventRepoOneStubBuild(appointmentStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "appointment-id",
            appointmentUpdateStub,
        ),
        ok(appointmentUpdatedStub),
    );
});
