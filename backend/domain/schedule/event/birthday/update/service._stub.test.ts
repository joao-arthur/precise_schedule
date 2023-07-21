import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateBirthdayEventServiceMock } from "./UpdateBirthdayEventServiceMock.ts";

Deno.test("UpdateBirthdayEventServiceMock", async () => {
    assertEquals(
        await new UpdateBirthdayEventServiceMock(
            eventMock,
        ).update(),
        eventMock,
    );
});
