import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdatePartyEventServiceMock } from "./UpdatePartyEventServiceMock.ts";

Deno.test("UpdatePartyEventServiceMock", async () => {
    assertEquals(
        await new UpdatePartyEventServiceMock(
            eventMock,
        ).update(),
        eventMock,
    );
});
