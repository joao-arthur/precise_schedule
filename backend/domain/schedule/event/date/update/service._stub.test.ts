import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateDateEventServiceMock } from "./UpdateDateEventServiceMock.ts";

Deno.test("UpdateDateEventServiceMock", async () => {
    assertEquals(
        await new UpdateDateEventServiceMock(
            eventMock,
        ).update(),
        eventMock,
    );
});
