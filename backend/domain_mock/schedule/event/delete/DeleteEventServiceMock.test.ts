import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { DeleteEventServiceMock } from "./DeleteEventServiceMock.ts";

Deno.test("DeleteEventServiceMock", async () => {
    assertEquals(
        await new DeleteEventServiceMock(eventMock).del(),
        eventMock,
    );
});
