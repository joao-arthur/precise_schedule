import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "../update/UpdateEventModelMock.ts";
import { UpdateBirthdayEventFactoryMock } from "./UpdateBirthdayEventFactoryMock.ts";

Deno.test("UpdateBirthdayEventFactoryMock", () => {
    assertEquals(
        new UpdateBirthdayEventFactoryMock(
            updateEventModelMock,
        ).build(),
        updateEventModelMock,
    );
});
