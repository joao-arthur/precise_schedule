import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { FindUserRepositoryMock } from "./FindUserRepositoryMock.ts";

Deno.test("FindUserRepositoryMock", async () => {
    assertEquals(
        await new FindUserRepositoryMock(undefined).findById(),
        undefined,
    );
    assertEquals(
        await new FindUserRepositoryMock(undefined)
            .findByCredentials(),
        undefined,
    );
    assertEquals(
        await new FindUserRepositoryMock(userMock).findById(),
        userMock,
    );
    assertEquals(
        await new FindUserRepositoryMock(userMock)
            .findByCredentials(),
        userMock,
    );
});
