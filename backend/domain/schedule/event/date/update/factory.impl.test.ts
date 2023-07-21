import { assertEquals } from "std/testing/asserts.ts";
import { updateDateEventMock } from "@ps/domain_mock/schedule/event/updateDate/UpdateDateEventMock.ts";
import { UpdateDateEventFactoryImpl } from "./UpdateDateEventFactoryImpl.ts";

Deno.test("UpdateDateEventFactoryImpl", () => {
    assertEquals(
        new UpdateDateEventFactoryImpl().build(
            updateDateEventMock,
        ),
        {
            category: "DATE",
            frequency: "NEVER",
            weekendRepeat: false,
            ...updateDateEventMock,
        },
    );
});
