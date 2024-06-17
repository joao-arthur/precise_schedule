import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { httpRequestFullStub } from "../../../../http/request/model.stub.ts";
import { MeetingUpdateControllerImpl } from "./controller.ts";

Deno.test("MeetingUpdateControllerImpl", async () => {
    assertEquals(
        await new MeetingUpdateControllerImpl().handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
