import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { created } from "../../../http/response.ts";
import { httpRequestBodyStub } from "../../../../http/request/model.stub.ts";
import { MeetingCreateControllerImpl } from "./controller.ts";

Deno.test("MeetingCreateControllerImpl", async () => {
    assertEquals(
        await new MeetingCreateControllerImpl().handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
