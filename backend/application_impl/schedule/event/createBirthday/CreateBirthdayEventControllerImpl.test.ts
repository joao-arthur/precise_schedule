import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateBirthdayEventServiceMock } from "@ps/domain_mock/schedule/event/createBirthday/CreateBirthdayEventServiceMock.ts";
import { created } from "@ps/application/http/builder/200/created.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { CreateBirthdayEventControllerImpl } from "./CreateBirthdayEventControllerImpl.ts";

Deno.test("CreateBirthdayEventControllerImpl", async () => {
    assertEquals(
        await new CreateBirthdayEventControllerImpl(
            new CreateBirthdayEventServiceMock(eventMock),
        ).handle(httpRequestBodyMock),
        created(),
    );
});
