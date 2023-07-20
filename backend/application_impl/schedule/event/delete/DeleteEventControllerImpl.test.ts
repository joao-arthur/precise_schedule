import { assertEquals } from "std/testing/asserts.ts";
import { DeleteEventControllerImpl } from "./DeleteEventControllerImpl.ts";
import { DeleteEventServiceMock } from "@ps/domain_mock/schedule/event/delete/DeleteEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { httpRequestParamsMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

Deno.test("DeleteEventControllerImpl", async () => {
    assertEquals(
        await new DeleteEventControllerImpl(
            new DeleteEventServiceMock(eventMock),
        ).handle(eventMock.user, httpRequestParamsMock),
        ok(eventMock),
    );
});
