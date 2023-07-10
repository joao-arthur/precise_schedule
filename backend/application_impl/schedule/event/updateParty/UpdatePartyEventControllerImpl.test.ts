import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdatePartyEventServiceMock } from "@ps/domain_mock/schedule/event/updateParty/UpdatePartyEventServiceMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { UpdatePartyEventControllerImpl } from "./UpdatePartyEventControllerImpl.ts";

Deno.test("UpdatePartyEventControllerImpl", async () => {
    assertEquals(
        await new UpdatePartyEventControllerImpl(
            new UpdatePartyEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
