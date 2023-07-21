import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { UpdateUserFactoryMock } from "./UpdateUserFactoryMock.ts";

Deno.test("UpdateUserFactoryMock", () => {
    assertEquals(
        new UpdateUserFactoryMock(userMock).build(),
        userMock,
    );
});
