import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { createPartyEventMock } from "@ps/domain_mock/schedule/event/createParty/CreatePartyEventMock.ts";
import { CreatePartyEventFactoryMock } from "@ps/domain_mock/schedule/event/createParty/CreatePartyEventFactoryMock.ts";
import { CreatePartyEventServiceImpl } from "./CreatePartyEventServiceImpl.ts";

Deno.test("CreatePartyEventServiceImpl", async () => {
    assertEquals(
        await new CreatePartyEventServiceImpl(
            new CreatePartyEventFactoryMock(eventMock),
            new CreateEventServiceMock(eventMock),
        ).create(createPartyEventMock),
        eventMock,
    );
});
