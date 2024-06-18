import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoManyStubBuild,
    eventRepoOneStubBuild,
} from "./repo.stub.ts";
import { appointmentInfoStub, appointmentStub } from "./appointment/model.stub.ts";
import {
    eventInfoReadManyService,
    eventInfoReadOneService,
    EventNotFound,
    eventReadMany,
    eventReadOne,
    eventToEventInfo,
} from "./read.ts";

Deno.test("eventToEventInfo", () => {
    assertEquals(eventToEventInfo(appointmentStub), appointmentInfoStub);
});

Deno.test("eventReadMany", async () => {
    assertEquals(
        await eventReadMany(eventRepoEmptyStubBuild(), "user-id"),
        ok([]),
    );
    assertEquals(
        await eventReadMany(eventRepoManyStubBuild([appointmentStub]), "user-id"),
        ok([appointmentStub]),
    );
});

Deno.test("eventReadOne", async () => {
    assertEquals(
        await eventReadOne(eventRepoEmptyStubBuild(), "user-id", "event-id"),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventReadOne(eventRepoOneStubBuild(appointmentStub), "user-id", "event-id"),
        ok(appointmentStub),
    );
});

Deno.test("eventInfoReadManyService", async () => {
    assertEquals(
        await eventInfoReadManyService(eventRepoEmptyStubBuild(), "user-id"),
        ok([]),
    );
    assertEquals(
        await eventInfoReadManyService(eventRepoManyStubBuild([appointmentStub]), "user-id"),
        ok([appointmentInfoStub]),
    );
});

Deno.test("eventInfoReadOneService", async () => {
    assertEquals(
        await eventInfoReadOneService(eventRepoEmptyStubBuild(), "user-id", "event-id"),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventInfoReadOneService(
            eventRepoOneStubBuild(appointmentStub),
            "user-id",
            "event-id",
        ),
        ok(appointmentInfoStub),
    );
});
