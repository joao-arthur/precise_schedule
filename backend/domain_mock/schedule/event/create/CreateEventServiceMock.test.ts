import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateEventServiceMock } from "./CreateEventServiceMock.ts";

Deno.test("CreateEventServiceMock", () => {
    assertEquals(
        new CreateEventServiceMock(eventMock).create(),
        eventMock,
    );
});
