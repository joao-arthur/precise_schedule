import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorMock } from "@ps/domain_mock/validation/ValidatorMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventServiceMock } from "@ps/domain_mock/schedule/event/update/UpdateEventServiceMock.ts";
import { updateDateEventMock } from "@ps/domain_mock/schedule/event/updateDate/UpdateDateEventMock.ts";
import { UpdateDateEventFactoryMock } from "@ps/domain_mock/schedule/event/updateDate/UpdateDateEventFactoryMock.ts";
import { UpdateDateEventServiceImpl } from "./UpdateDateEventServiceImpl.ts";

Deno.test("UpdateDateEventServiceImpl", async () => {
    assertEquals(
        await new UpdateDateEventServiceImpl(
            new ValidatorMock(),
            new UpdateDateEventFactoryMock(eventMock),
            new UpdateEventServiceMock(eventMock),
        ).update(eventMock.user, eventMock.id, updateDateEventMock),
        eventMock,
    );
});
