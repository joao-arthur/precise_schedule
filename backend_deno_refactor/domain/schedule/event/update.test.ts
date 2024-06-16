import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import {  eventRepoDataStubBuild } from "./repo.stub.ts";
import { eventUpdate, eventUpdateToEvent } from "./update.ts";
import { appointmentStub, appointmentEventUpdateStub, appointmentUpdatedStub } from "./appointment/model.stub.ts";

Deno.test("eventUpdateToEvent", () => {
    assertEquals(
        eventUpdateToEvent(appointmentEventUpdateStub, appointmentStub, new Date("2024-07-18T15:43:12.377Z")),
        appointmentUpdatedStub,
    );
});

Deno.test("eventUpdate", async () => {
    assertEquals(
        await eventUpdate(
            eventRepoDataStubBuild([], appointmentStub),
            eventStub.user,
            eventStub.id,
            eventUpdateModelStub,
        ),
        ok(eventStub),
    );
});
