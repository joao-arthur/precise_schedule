import { assertEquals } from "std/testing/asserts.ts";
import { updatePartyEventMock } from "@ps/domain_mock/schedule/event/updateParty/UpdatePartyEventMock.ts";
import { UpdatePartyEventFactoryImpl } from "./UpdatePartyEventFactoryImpl.ts";

Deno.test("UpdatePartyEventFactoryImpl", () => {
    assertEquals(
        new UpdatePartyEventFactoryImpl().build(
            updatePartyEventMock,
        ),
        {
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
            ...updatePartyEventMock,
        },
    );
});
