import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../domain/lang/result.ts";
import { appointmentStub } from "../../domain/schedule/event/appointment/model.stub.ts";
import { eventRepoMemory } from "./eventRepoMemory.ts";

Deno.test("eventRepoMemory", async () => {
    const repo = eventRepoMemory();
    assertEquals(await repo.cReadOne(appointmentStub.user, appointmentStub.id), ok(undefined));
    await repo.cCreate(appointmentStub);
    assertEquals(
        await repo.cReadOne(appointmentStub.user, appointmentStub.id),
        ok(appointmentStub),
    );
    assertEquals(await repo.cReadMany(appointmentStub.user), ok([appointmentStub]));
    await repo.cUpdate({ ...appointmentStub, name: "name2" });
    assertEquals(
        await repo.cReadOne(appointmentStub.user, appointmentStub.id),
        ok({ ...appointmentStub, name: "name2" }),
    );
    await repo.cDelete(appointmentStub.id);
    assertEquals(await repo.cReadOne(appointmentStub.user, appointmentStub.id), ok(undefined));
    assertEquals(await repo.cReadMany(appointmentStub.user), ok([]));
});
