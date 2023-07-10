import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateDateEventServiceMock } from "@ps/domain_mock/schedule/event/updateDate/UpdateDateEventServiceMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { UpdateDateEventControllerImpl } from "./UpdateDateEventControllerImpl.ts";

Deno.test("UpdateDateEventControllerImpl", async () => {
    assertEquals(
        await new UpdateDateEventControllerImpl(
            new UpdateDateEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
