import { assertEquals } from "std/testing/asserts.ts";

import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { updateEventModelMock } from "@ps/domain_mock/schedule/event/update/UpdateEventModelMock.ts";
import { UpdateEventRepositoryMock } from "@ps/domain_mock/schedule/event/update/UpdateEventRepositoryMock.ts";
import { UpdateEventFactoryMock } from "@ps/domain_mock/schedule/event/update/UpdateEventFactoryMock.ts";
import { FindEventServiceMock } from "@ps/domain_mock/schedule/event/find/FindEventServiceMock.ts";
import { UpdateEventServiceImpl } from "./UpdateEventServiceImpl.ts";

Deno.test("UpdateEventServiceImpl", async () => {
    assertEquals(
        await new UpdateEventServiceImpl(
            new UpdateEventRepositoryMock(),
            new UpdateEventFactoryMock(eventMock),
            new FindEventServiceMock(eventMock),
        ).update(eventMock.id, updateEventModelMock),
        eventMock,
    );
});
