import { assertEquals } from "@std/assert/assert-equals";
import {
    appointmentInfoStub,
    appointmentStub,
} from "../../../domain/schedule/event/appointment/model.stub.ts";
import { eventRepoOneStubBuild } from "../../../domain/schedule/event/repo.stub.ts";
import { ok } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { eventInfoReadOneController } from "./readOne.ts";

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
