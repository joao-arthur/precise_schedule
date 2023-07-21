import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateBirthdayEventServiceMock } from "./CreateBirthdayEventServiceMock.ts";

Deno.test("CreateBirthdayEventServiceMock", async () => {
    assertEquals(
        await new CreateBirthdayEventServiceMock(
            eventMock,
        ).create(),
        eventMock,
    );
});
