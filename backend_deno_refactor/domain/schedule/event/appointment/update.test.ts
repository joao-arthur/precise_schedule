import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import {
    appointmentEventUpdateStub,
    appointmentStub,
    appointmentUpdatedStub,
    appointmentUpdateStub,
} from "./model.stub.ts";
import { eventRepoStubBuild } from "../repo.stub.ts";
import { appointmentUpdate, appointmentUpdateToEventUpdate } from "./update.ts";

Deno.test("appointmentUpdateToEventUpdate", () => {
    assertEquals(
        appointmentUpdateToEventUpdate(appointmentUpdateStub),
        appointmentEventUpdateStub,
    );
});

Deno.test("appointmentUpdate", async () => {
    assertEquals(
        await appointmentUpdate(
            eventRepoStubBuild([], appointmentStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "appointment-id",
            appointmentUpdateStub,
        ),
        ok(appointmentUpdatedStub),
    );
});
