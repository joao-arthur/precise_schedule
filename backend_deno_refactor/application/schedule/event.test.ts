import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../domain/generator/date.stub.ts";
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
    appointmentCreateController,
    appointmentUpdateController,
    birthdayCreateController,
    birthdayUpdateController,
    dateCreateController,
    dateUpdateController,
    eventDeleteController,
    eventInfoReadManyController,
    eventInfoReadOneController,
    meetingCreateController,
    meetingUpdateController,
    partyCreateController,
    partyUpdateController,
} from "./event.ts";

Deno.test("eventDeleteController", async () => {
    assertEquals(
        await eventDeleteController(
            eventRepoOneStubBuild(appointmentStub),
            "user-id",
            requestBuild(undefined, { id: "appointment-id" }),
        ),
        noContent(),
    );
});

Deno.test("eventInfoReadManyController", async () => {
    assertEquals(
        await eventInfoReadManyController(
            eventRepoManyStubBuild([appointmentStub]),
            "user-id",
        ),
        ok([appointmentInfoStub]),
    );
});

Deno.test("eventInfoReadOneController", async () => {
    assertEquals(
        await eventInfoReadOneController(
            eventRepoOneStubBuild(appointmentStub),
            "user-id",
            requestBuild(undefined, { id: "appointment-id" }),
        ),
        ok(appointmentInfoStub),
    );
});

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

Deno.test("birthdayCreateController", async () => {
    assertEquals(
        await birthdayCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("birthday-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(birthdayCreateStub, {}),
        ),
        created(birthdayStub),
    );
});

Deno.test("birthdayUpdateController", async () => {
    assertEquals(
        await birthdayUpdateController(
            eventRepoOneStubBuild(birthdayStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(birthdayUpdateStub, { id: "birthday-id" }),
        ),
        noContent(),
    );
});

Deno.test("dateCreateController", async () => {
    assertEquals(
        await dateCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("date-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(dateCreateStub, {}),
        ),
        created(dateStub),
    );
});

Deno.test("dateUpdateController", async () => {
    assertEquals(
        await dateUpdateController(
            eventRepoOneStubBuild(dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(dateUpdateStub, { id: "date-id" }),
        ),
        noContent(),
    );
});

Deno.test("meetingCreateController", async () => {
    assertEquals(
        await meetingCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("meeting-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(meetingCreateStub, {}),
        ),
        created(meetingStub),
    );
});

Deno.test("meetingUpdateController", async () => {
    assertEquals(
        await meetingUpdateController(
            eventRepoOneStubBuild(meetingStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(meetingUpdateStub, { id: "meeting-id" }),
        ),
        noContent(),
    );
});

Deno.test("partyCreateController", async () => {
    assertEquals(
        await partyCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("party-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(partyCreateStub, {}),
        ),
        created(partyStub),
    );
});

Deno.test("partyUpdateController", async () => {
    assertEquals(
        await partyUpdateController(
            eventRepoOneStubBuild(partyStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(partyUpdateStub, { id: "party-id" }),
        ),
        noContent(),
    );
});
