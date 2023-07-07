import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { FindEventServiceMock } from "./FindEventServiceMock.ts";

Deno.test("FindEventServiceMock", async () => {
    assertEquals(
        await new FindEventServiceMock(eventMock).findById(),
        eventMock,
    );
});
