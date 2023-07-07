import { assertEquals } from "std/testing/asserts.ts";
import { createDateEventMock } from "@ps/domain_mock/schedule/event/createDate/CreateDateEventMock.ts";
import { CreateDateEventFactoryImpl } from "./CreateDateEventFactoryImpl.ts";

Deno.test("CreateDateEventFactoryImpl", () => {
    assertEquals(
        new CreateDateEventFactoryImpl().build(
            createDateEventMock,
        ),
        {
            category: "DATE",
            frequency: "NEVER",
            weekendRepeat: false,
            ...createDateEventMock,
        },
    );
});
