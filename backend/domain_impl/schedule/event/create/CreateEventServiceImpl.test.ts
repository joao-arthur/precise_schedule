import { assertEquals } from "std/testing/asserts.ts";

import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { createEventModelMock } from "@ps/domain_mock/schedule/event/create/CreateEventModelMock.ts";
import { CreateEventRepositoryMock } from "@ps/domain_mock/schedule/event/create/CreateEventRepositoryMock.ts";
import { CreateEventFactoryMock } from "@ps/domain_mock/schedule/event/create/CreateEventFactoryMock.ts";
import { CreateEventServiceImpl } from "./CreateEventServiceImpl.ts";

Deno.test("CreateEventServiceImpl", async () => {
    assertEquals(
        await new CreateEventServiceImpl(
            new CreateEventRepositoryMock(),
            new CreateEventFactoryMock(eventMock),
        ).create(createEventModelMock),
        eventMock,
    );
});
