import { assertEquals } from "std/testing/asserts.ts";
import { DecodeSessionServiceMock } from "./DecodeSessionServiceMock.ts";
import { userMock } from "../../schedule/user/UserMock.ts";

Deno.test("DecodeSessionServiceMock", async () => {
    const decodeSessionServiceMock = new DecodeSessionServiceMock(
        userMock.id,
    );
    assertEquals(
        await decodeSessionServiceMock.decode(),
        userMock.id,
    );
});
