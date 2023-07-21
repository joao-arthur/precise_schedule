import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateEventFactoryMock } from "./UpdateEventFactoryMock.ts";

Deno.test("UpdateEventFactoryMock", () => {
    assertEquals(
        new UpdateEventFactoryMock(eventMock).build(),
        eventMock,
    );
});
