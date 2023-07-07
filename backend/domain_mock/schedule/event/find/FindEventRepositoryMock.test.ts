import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { FindEventRepositoryMock } from "./FindEventRepositoryMock.ts";

Deno.test("FindEventRepositoryMock", async () => {
    assertEquals(
        await new FindEventRepositoryMock(undefined).findById(),
        undefined,
    );
    assertEquals(
        await new FindEventRepositoryMock(eventMock).findById(),
        eventMock,
    );
});
