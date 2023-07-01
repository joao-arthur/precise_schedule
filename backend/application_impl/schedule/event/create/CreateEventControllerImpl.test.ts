import { assertEquals } from "std/testing/asserts.ts";
import { CreateEventControllerImpl } from "./CreateEventControllerImpl.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application/http/builder/ok.ts";

Deno.test("CreateEventControllerImpl", () => {
    assertEquals(
        new CreateEventControllerImpl(
            new CreateEventServiceMock(eventMock),
        ).handle(httpRequestBodyMock),
        ok(eventMock),
    );
});
