import { assertEquals } from "@std/assert/assert-equals";
import {
    appointmentInfoStub,
    appointmentStub,
} from "../../../domain/schedule/event/appointment/model.stub.ts";
import { eventRepoManyStubBuild } from "../../../domain/schedule/event/repo.stub.ts";
import { ok } from "../../http/response.ts";
import { eventInfoReadManyController } from "./readMany.ts";

Deno.test("eventInfoReadManyController", async () => {
    assertEquals(
        await eventInfoReadManyController(
            eventRepoManyStubBuild([appointmentStub]),
            "user-id",
        ),
        ok([appointmentInfoStub]),
    );
});
