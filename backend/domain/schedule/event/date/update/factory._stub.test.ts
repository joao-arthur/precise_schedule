import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "../update/UpdateEventModelMock.ts";
import { UpdateDateEventFactoryMock } from "./UpdateDateEventFactoryMock.ts";

Deno.test("UpdateDateEventFactoryMock", () => {
    assertEquals(
        new UpdateDateEventFactoryMock(
            updateEventModelMock,
        ).build(),
        updateEventModelMock,
    );
});
