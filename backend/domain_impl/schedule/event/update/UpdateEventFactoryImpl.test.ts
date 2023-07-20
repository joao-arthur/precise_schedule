import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "@ps/domain_mock/schedule/event/update/UpdateEventModelMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventFactoryImpl } from "./UpdateEventFactoryImpl.ts";

Deno.test("UpdateEventFactoryImpl", () => {
    assertEquals(
        new UpdateEventFactoryImpl().build(
            updateEventModelMock,
            eventMock,
        ),
        {
            id: eventMock.id,
            user: eventMock.user,
            createdAt: eventMock.createdAt,
            updatedAt: new Date(),
            ...updateEventModelMock,
        },
    );
});
