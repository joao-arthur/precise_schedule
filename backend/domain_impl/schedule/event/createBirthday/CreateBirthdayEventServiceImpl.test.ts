import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { createBirthdayEventMock } from "@ps/domain_mock/schedule/event/createBirthday/CreateBirthdayEventMock.ts";
import { CreateBirthdayEventFactoryMock } from "@ps/domain_mock/schedule/event/createBirthday/CreateBirthdayEventFactoryMock.ts";
import { CreateBirthdayEventServiceImpl } from "./CreateBirthdayEventServiceImpl.ts";

Deno.test("CreateBirthdayEventServiceImpl", async () => {
    assertEquals(
        await new CreateBirthdayEventServiceImpl(
            new CreateBirthdayEventFactoryMock(eventMock),
            new CreateEventServiceMock(eventMock),
        ).create(createBirthdayEventMock),
        eventMock,
    );
});
