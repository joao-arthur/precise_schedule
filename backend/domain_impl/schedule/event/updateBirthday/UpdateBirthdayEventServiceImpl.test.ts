import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventServiceMock } from "@ps/domain_mock/schedule/event/update/UpdateEventServiceMock.ts";
import { updateBirthdayEventMock } from "@ps/domain_mock/schedule/event/updateBirthday/UpdateBirthdayEventMock.ts";
import { UpdateBirthdayEventFactoryMock } from "@ps/domain_mock/schedule/event/updateBirthday/UpdateBirthdayEventFactoryMock.ts";
import { UpdateBirthdayEventServiceImpl } from "./UpdateBirthdayEventServiceImpl.ts";

Deno.test("UpdateBirthdayEventServiceImpl", async () => {
    assertEquals(
        await new UpdateBirthdayEventServiceImpl(
            new UpdateBirthdayEventFactoryMock(eventMock),
            new UpdateEventServiceMock(eventMock),
        ).update(eventMock.id, updateBirthdayEventMock),
        eventMock,
    );
});
