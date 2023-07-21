import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateEventFactoryMock } from "./CreateEventFactoryMock.ts";

Deno.test("CreateEventFactoryMock", () => {
    assertEquals(
        new CreateEventFactoryMock(eventMock).build(),
        eventMock,
    );
});
