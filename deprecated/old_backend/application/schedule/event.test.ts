import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../domain/generator.stub.ts";
import { dateGeneratorStubBuild } from "../../domain/generator.stub.ts";
import {
    appointmentCreateStub,
    appointmentInfoStub,
    appointmentStub,
    appointmentUpdateStub,
} from "../../domain/schedule/event/appointment/model.stub.ts";
import {
    birthdayCreateStub,
    birthdayStub,
    birthdayUpdateStub,
} from "../../domain/schedule/event/birthday/model.stub.ts";
import {
    dateCreateStub,
    dateStub,
    dateUpdateStub,
} from "../../domain/schedule/event/date/model.stub.ts";
import {
    meetingCreateStub,
    meetingStub,
    meetingUpdateStub,
} from "../../domain/schedule/event/meeting/model.stub.ts";
import {
    partyCreateStub,
    partyStub,
    partyUpdateStub,
} from "../../domain/schedule/event/party/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoManyStubBuild,
    eventRepoOneStubBuild,
} from "../../domain/schedule/event/repo.stub.ts";
import { created, noContent, ok } from "../http/response.ts";
import { requestBuild } from "../http/request.stub.ts";
import {
    appointmentCreateEndpoint,
    appointmentUpdateEndpoint,
    birthdayCreateEndpoint,
    birthdayUpdateEndpoint,
    dateCreateEndpoint,
    dateUpdateEndpoint,
    eventDeleteEndpoint,
    eventInfoReadManyEndpoint,
    eventInfoReadOneEndpoint,
    meetingCreateEndpoint,
    meetingUpdateEndpoint,
    partyCreateEndpoint,
    partyUpdateEndpoint,
} from "./event.ts";

Deno.test("eventDeleteEndpoint", async () => {
    assertEquals(
        await eventDeleteEndpoint(
            eventRepoOneStubBuild(appointmentStub),
            "user-id",
            requestBuild(undefined, { id: "appointment-id" }),
        ),
        noContent(),
    );
});

Deno.test("eventInfoReadManyEndpoint", async () => {
    assertEquals(
        await eventInfoReadManyEndpoint(
            eventRepoManyStubBuild([appointmentStub]),
            "user-id",
        ),
        ok([appointmentInfoStub]),
    );
});

Deno.test("eventInfoReadOneEndpoint", async () => {
    assertEquals(
        await eventInfoReadOneEndpoint(
            eventRepoOneStubBuild(appointmentStub),
            "user-id",
            requestBuild(undefined, { id: "appointment-id" }),
        ),
        ok(appointmentInfoStub),
    );
});

Deno.test("appointmentCreateEndpoint", async () => {
    assertEquals(
        await appointmentCreateEndpoint(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("appointment-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(appointmentCreateStub, {}),
        ),
        created(appointmentStub),
    );
});

Deno.test("appointmentUpdateEndpoint", async () => {
    assertEquals(
        await appointmentUpdateEndpoint(
            eventRepoOneStubBuild(appointmentStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(appointmentUpdateStub, { id: "appointment-id" }),
        ),
        noContent(),
    );
});

Deno.test("birthdayCreateEndpoint", async () => {
    assertEquals(
        await birthdayCreateEndpoint(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("birthday-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(birthdayCreateStub, {}),
        ),
        created(birthdayStub),
    );
});

Deno.test("birthdayUpdateEndpoint", async () => {
    assertEquals(
        await birthdayUpdateEndpoint(
            eventRepoOneStubBuild(birthdayStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(birthdayUpdateStub, { id: "birthday-id" }),
        ),
        noContent(),
    );
});

Deno.test("dateCreateEndpoint", async () => {
    assertEquals(
        await dateCreateEndpoint(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("date-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(dateCreateStub, {}),
        ),
        created(dateStub),
    );
});

Deno.test("dateUpdateEndpoint", async () => {
    assertEquals(
        await dateUpdateEndpoint(
            eventRepoOneStubBuild(dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(dateUpdateStub, { id: "date-id" }),
        ),
        noContent(),
    );
});

Deno.test("meetingCreateEndpoint", async () => {
    assertEquals(
        await meetingCreateEndpoint(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("meeting-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(meetingCreateStub, {}),
        ),
        created(meetingStub),
    );
});

Deno.test("meetingUpdateEndpoint", async () => {
    assertEquals(
        await meetingUpdateEndpoint(
            eventRepoOneStubBuild(meetingStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(meetingUpdateStub, { id: "meeting-id" }),
        ),
        noContent(),
    );
});

Deno.test("partyCreateEndpoint", async () => {
    assertEquals(
        await partyCreateEndpoint(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("party-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(partyCreateStub, {}),
        ),
        created(partyStub),
    );
});

Deno.test("partyUpdateEndpoint", async () => {
    assertEquals(
        await partyUpdateEndpoint(
            eventRepoOneStubBuild(partyStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(partyUpdateStub, { id: "party-id" }),
        ),
        noContent(),
    );
});
