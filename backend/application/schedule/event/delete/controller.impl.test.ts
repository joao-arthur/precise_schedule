import { assertEquals } from "std/testing/asserts.ts";
import { DeleteEventControllerImpl } from "./DeleteEventControllerImpl.ts";
import { DeleteEventServiceMock } from "@ps/domain_mock/schedule/event/delete/DeleteEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { httpRequestParamsMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";

Deno.test("DeleteEventControllerImpl", async () => {
    assertEquals(
        await new DeleteEventControllerImpl(
            new DeleteEventServiceMock(),
        ).handle(eventMock.user, httpRequestParamsMock),
        noContent(),
    );
});
