import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { DeleteEventServiceMock } from "./DeleteEventServiceMock.ts";

Deno.test("DeleteEventServiceMock", () => {
    assertEquals(
        new DeleteEventServiceMock(eventMock).del(),
        eventMock,
    );
});
