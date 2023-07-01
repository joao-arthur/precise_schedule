import { assertEquals } from "std/testing/asserts.ts";
import { UpdateEventControllerImpl } from "./UpdateEventControllerImpl.ts";
import { UpdateEventServiceMock } from "@ps/domain_mock/schedule/event/update/UpdateEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application/http/builder/ok.ts";

Deno.test("UpdateEventControllerImpl", () => {
    assertEquals(
        new UpdateEventControllerImpl(
            new UpdateEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        ok(eventMock),
    );
});
