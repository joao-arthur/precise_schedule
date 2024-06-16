import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import { eventRepoDataStubBuild, eventRepoEmptyStubBuild } from "./repo.stub.ts";
import { appointmentInfoStub, appointmentStub } from "./appointment/model.stub.ts";
import {
    eventInfoReadMany,
    eventInfoReadOne,
    EventNotFound,
    eventReadMany,
    eventReadOne,
    eventToEventFind,
} from "./read.ts";

Deno.test("eventToEventFind", () => {
    assertEquals(eventToEventFind(appointmentStub), appointmentInfoStub);
});

Deno.test("eventReadMany", async () => {
    assertEquals(
        await eventReadMany(eventRepoEmptyStubBuild(), "user-id"),
        ok([]),
    );
    assertEquals(
        await eventReadMany(eventRepoDataStubBuild([appointmentStub], undefined), "user-id"),
        ok([appointmentStub]),
    );
});

Deno.test("eventReadOne", async () => {
    assertEquals(
        await eventReadOne(eventRepoEmptyStubBuild(), "user-id", "event-id"),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventReadOne(eventRepoDataStubBuild([], appointmentStub), "user-id", "event-id"),
        ok(appointmentStub),
    );
});

Deno.test("eventInfoReadMany", async () => {
    assertEquals(
        await eventInfoReadMany(eventRepoEmptyStubBuild(), "user-id"),
        ok([]),
    );
    assertEquals(
        await eventInfoReadMany(eventRepoDataStubBuild([appointmentStub], undefined), "user-id"),
        ok([appointmentInfoStub]),
    );
});

Deno.test("eventInfoReadOne", async () => {
    assertEquals(
        await eventInfoReadOne(eventRepoEmptyStubBuild(), "user-id", "event-id"),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventInfoReadOne(eventRepoDataStubBuild([], appointmentStub), "user-id", "event-id"),
        ok(appointmentInfoStub),
    );
});
