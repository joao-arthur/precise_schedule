import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import { RepoError } from "../../repository/repo.ts";
import { appointmentStub } from "./appointment/model.stub.ts";
import {
    eventRepoDataStubBuild,
    eventRepoEmptyStubBuild,
    eventRepoErrStubBuild,
} from "./repo.stub.ts";

Deno.test("eventRepoDataStubBuild", async () => {
    const repo = eventRepoDataStubBuild([appointmentStub], appointmentStub);
    assertEquals(await repo.cCreate(appointmentStub), ok(undefined));
    assertEquals(await repo.cUpdate(appointmentStub), ok(undefined));
    assertEquals(await repo.cReadMany("user-id"), ok([appointmentStub]));
    assertEquals(await repo.cReadOne("user-id", "user-id"), ok(appointmentStub));
    assertEquals(await repo.cDelete("event-id"), ok(undefined));
});

Deno.test("eventRepoEmptyStubBuild", async () => {
    const repo = eventRepoEmptyStubBuild();
    assertEquals(await repo.cCreate(appointmentStub), ok(undefined));
    assertEquals(await repo.cUpdate(appointmentStub), ok(undefined));
    assertEquals(await repo.cReadMany("user-id"), ok([]));
    assertEquals(await repo.cReadOne("user-id", "user-id"), ok(undefined));
    assertEquals(await repo.cDelete("event-id"), ok(undefined));
});

Deno.test("eventRepoErrStubBuild", async () => {
    const repo = eventRepoErrStubBuild();
    assertEquals(await repo.cCreate(appointmentStub), err(new RepoError()));
    assertEquals(await repo.cUpdate(appointmentStub), err(new RepoError()));
    assertEquals(await repo.cReadMany("user-id"), err(new RepoError()));
    assertEquals(await repo.cReadOne("user-id", "user-id"), err(new RepoError()));
    assertEquals(await repo.cDelete("event-id"), err(new RepoError()));
});
