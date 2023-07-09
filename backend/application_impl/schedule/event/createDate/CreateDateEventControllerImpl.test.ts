import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateDateEventServiceMock } from "@ps/domain_mock/schedule/event/createDate/CreateDateEventServiceMock.ts";
import { created } from "@ps/application/http/builder/200/created.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { CreateDateEventControllerImpl } from "./CreateDateEventControllerImpl.ts";

Deno.test("CreateDateEventControllerImpl", async () => {
    assertEquals(
        await new CreateDateEventControllerImpl(
            new CreateDateEventServiceMock(eventMock),
        ).handle(httpRequestBodyMock),
        created(),
    );
});
