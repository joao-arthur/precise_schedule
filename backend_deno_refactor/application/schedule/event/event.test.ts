import { assertEquals } from "@std/assert/assert-equals";
import {
    appointmentInfoStub,
    appointmentStub,
} from "../../../domain/schedule/event/appointment/model.stub.ts";
import {
    eventRepoManyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { noContent, ok } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import {
    eventDeleteController,
    eventInfoReadManyController,
    eventInfoReadOneController,
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
