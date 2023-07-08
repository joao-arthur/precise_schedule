import { assertEquals } from "std/testing/asserts.ts";
import { CreateSessionServiceJWTAdapter } from "./create/CreateSessionServiceJWTAdapter.ts";
import { DecodeSessionServiceJWTAdapter } from "./decode/DecodeSessionServiceJWTAdapter.ts";

const userId = "marie_curie";

Deno.test("SessionJWTAdapter", async () => {
    const session = await new CreateSessionServiceJWTAdapter()
        .create(userId);
    const decodedUserId = await new DecodeSessionServiceJWTAdapter()
        .decode(session);
    assertEquals(decodedUserId, userId);
});
