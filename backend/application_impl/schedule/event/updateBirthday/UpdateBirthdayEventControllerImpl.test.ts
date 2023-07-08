import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateBirthdayEventServiceMock } from "@ps/domain_mock/schedule/event/updateBirthday/UpdateBirthdayEventServiceMock.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { UpdateBirthdayEventControllerImpl } from "./UpdateBirthdayEventControllerImpl.ts";

Deno.test("UpdateBirthdayEventControllerImpl", async () => {
    assertEquals(
        await new UpdateBirthdayEventControllerImpl(
            new UpdateBirthdayEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
