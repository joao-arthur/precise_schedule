import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "../update/UpdateEventModelMock.ts";
import { UpdatePartyEventFactoryMock } from "./UpdatePartyEventFactoryMock.ts";

Deno.test("UpdatePartyEventFactoryMock", () => {
    assertEquals(
        new UpdatePartyEventFactoryMock(
            updateEventModelMock,
        ).build(),
        updateEventModelMock,
    );
});
