import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelMock } from "../create/CreateEventModelMock.ts";
import { CreatePartyEventFactoryMock } from "./CreatePartyEventFactoryMock.ts";

Deno.test("CreatePartyEventFactoryMock", () => {
    assertEquals(
        new CreatePartyEventFactoryMock(
            createEventModelMock,
        ).build(),
        createEventModelMock,
    );
});
