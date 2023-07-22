import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { MeetingCreateServiceStub } from "@ps/domain/schedule/event/meeting/create/service._stub.ts";
import { created } from "../../../http/response/created/builder.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { MeetingCreateControllerImpl } from "./controller.impl.ts";

Deno.test("MeetingCreateControllerImpl", async () => {
    assertEquals(
        await new MeetingCreateControllerImpl(
            new MeetingCreateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
