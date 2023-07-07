import { assertEquals } from "std/testing/asserts.ts";
import { createPartyEventMock } from "@ps/domain_mock/schedule/event/createParty/CreatePartyEventMock.ts";
import { CreatePartyEventFactoryImpl } from "./CreatePartyEventFactoryImpl.ts";

Deno.test("CreatePartyEventFactoryImpl", () => {
    assertEquals(
        new CreatePartyEventFactoryImpl().build(
            createPartyEventMock,
        ),
        {
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
            ...createPartyEventMock,
        },
    );
});
