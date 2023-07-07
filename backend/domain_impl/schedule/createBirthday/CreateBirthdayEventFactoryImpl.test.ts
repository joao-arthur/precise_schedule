import { assertEquals } from "std/testing/asserts.ts";
import { createBirthdayEventMock } from "@ps/domain_mock/schedule/event/createBirthday/CreateBirthdayEventMock.ts";
import { CreateBirthdayEventFactoryImpl } from "./CreateBirthdayEventFactoryImpl.ts";

Deno.test("CreateBirthdayEventFactoryImpl", () => {
    assertEquals(
        new CreateBirthdayEventFactoryImpl().build(
            createBirthdayEventMock,
        ),
        {
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1_Y",
            weekendRepeat: false,
            ...createBirthdayEventMock,
        },
    );
});
