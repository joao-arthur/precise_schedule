import { assertEquals } from "@std/assert/assert-equals";
import { sessionJWT } from "./sessionJWT.ts";
import { ok } from "../../domain/lang/result.ts";

const userId = "marie_curie";

Deno.test("sessionJWT", async () => {
    const service = sessionJWT();
    const sessionResult = await service.create(userId);
    assertEquals(sessionResult.type, "ok");
    if (sessionResult.type === "ok") {
        const decodedUserId = await service.decode(sessionResult.data);
        assertEquals(decodedUserId, ok(userId));
    }
});
