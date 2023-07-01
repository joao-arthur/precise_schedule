import { assertEquals } from "std/testing/asserts.ts";
import { FindEventControllerImpl } from "./FindEventControllerImpl.ts";
import { FindEventServiceMock } from "@ps/domain_mock/schedule/event/find/FindEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { httpRequestParamsMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application/http/builder/ok.ts";

Deno.test("FindEventControllerImpl", () => {
    assertEquals(
        new FindEventControllerImpl(
            new FindEventServiceMock(eventMock),
        ).handle(httpRequestParamsMock),
        ok(eventMock),
    );
});
