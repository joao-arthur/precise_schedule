import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "@ps/domain_mock/schedule/event/update/UpdateEventModelMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventFactoryImpl } from "./UpdateEventFactoryImpl.ts";

Deno.test("UpdateEventFactoryImpl", () => {
    const now = new Date();
    assertEquals(
        new UpdateEventFactoryImpl().build(
            updateEventModelMock,
            eventMock,
        ),
        {
            id: eventMock.id,
            createdAt: eventMock.createdAt,
            updatedAt: now,
            ...updateEventModelMock,
        },
    );
});
