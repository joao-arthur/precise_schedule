import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { FindUserRepositoryMock } from "./FindUserRepositoryMock.ts";

Deno.test("FindUserRepositoryMock", () => {
    assertEquals(
        new FindUserRepositoryMock(undefined).findById(),
        undefined,
    );
    assertEquals(
        new FindUserRepositoryMock(undefined).findByCredentials(),
        undefined,
    );
    assertEquals(
        new FindUserRepositoryMock(userMock).findById(),
        userMock,
    );
    assertEquals(
        new FindUserRepositoryMock(userMock).findByCredentials(),
        userMock,
    );
});
