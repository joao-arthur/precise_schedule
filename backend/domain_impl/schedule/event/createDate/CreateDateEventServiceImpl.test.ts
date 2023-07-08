import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { createDateEventMock } from "@ps/domain_mock/schedule/event/createDate/CreateDateEventMock.ts";
import { CreateDateEventFactoryMock } from "@ps/domain_mock/schedule/event/createDate/CreateDateEventFactoryMock.ts";
import { CreateDateEventServiceImpl } from "./CreateDateEventServiceImpl.ts";

Deno.test("CreateDateEventServiceImpl", async () => {
    assertEquals(
        await new CreateDateEventServiceImpl(
            new CreateDateEventFactoryMock(eventMock),
            new CreateEventServiceMock(eventMock),
        ).create(createDateEventMock),
        eventMock,
    );
});
