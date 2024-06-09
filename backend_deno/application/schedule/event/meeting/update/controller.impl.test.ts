import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { MeetingUpdateServiceStub } from "@ps/domain/schedule/event/meeting/update/service._stub.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";
import { httpRequestFullStub } from "../../../../http/request/model._stub.ts";
import { MeetingUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("MeetingUpdateControllerImpl", async () => {
    assertEquals(
        await new MeetingUpdateControllerImpl(
            new MeetingUpdateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
