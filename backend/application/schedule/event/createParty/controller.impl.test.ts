import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreatePartyEventServiceMock } from "@ps/domain_mock/schedule/event/createParty/CreatePartyEventServiceMock.ts";
import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { CreatePartyEventControllerImpl } from "./CreatePartyEventControllerImpl.ts";

Deno.test("CreatePartyEventControllerImpl", async () => {
    assertEquals(
        await new CreatePartyEventControllerImpl(
            new CreatePartyEventServiceMock(eventMock),
        ).handle(eventMock.user, httpRequestBodyMock),
        created(eventMock),
    );
});
