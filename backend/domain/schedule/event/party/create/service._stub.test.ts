import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreatePartyEventServiceMock } from "./CreatePartyEventServiceMock.ts";

Deno.test("CreatePartyEventServiceMock", async () => {
    assertEquals(
        await new CreatePartyEventServiceMock(
            eventMock,
        ).create(),
        eventMock,
    );
});
