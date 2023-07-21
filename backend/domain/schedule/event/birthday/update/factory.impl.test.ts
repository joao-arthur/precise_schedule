import { assertEquals } from "std/testing/asserts.ts";
import { updateBirthdayEventMock } from "@ps/domain_mock/schedule/event/updateBirthday/UpdateBirthdayEventMock.ts";
import { UpdateBirthdayEventFactoryImpl } from "./UpdateBirthdayEventFactoryImpl.ts";

Deno.test("UpdateBirthdayEventFactoryImpl", () => {
    assertEquals(
        new UpdateBirthdayEventFactoryImpl().build(
            updateBirthdayEventMock,
        ),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1_Y",
            weekendRepeat: false,
            ...updateBirthdayEventMock,
        },
    );
});
