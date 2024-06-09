import { assertEquals } from "@std/assert/assert-equals";
import { SessionCreateServiceJWTAdapter } from "./create/jwt.adapter.ts";
import { DecodeSessionServiceJWTAdapter } from "./decode/jwt.adapter.ts";

const userId = "marie_curie";

Deno.test("SessionJWTAdapter", async () => {
    const session = await new SessionCreateServiceJWTAdapter().create(userId);
    const decodedUserId = await new DecodeSessionServiceJWTAdapter().decode(session);
    assertEquals(decodedUserId, userId);
});
