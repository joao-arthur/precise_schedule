import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { FindEventRepositoryMock } from "./FindEventRepositoryMock.ts";

Deno.test("FindEventRepositoryMock", () => {
    assertEquals(
        new FindEventRepositoryMock(undefined).findById(),
        undefined,
    );
    assertEquals(
        new FindEventRepositoryMock(eventMock).findById(),
        eventMock,
    );
});
