import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { sessionStub } from "./model.stub.ts";
import { decodeSessionStubBuild } from "./decode.stub.ts";

Deno.test("decodeSessionStubBuild", async () => {
    assertEquals(
        await decodeSessionStubBuild("user-id").decode(sessionStub),
        ok("user-id"),
    );
});
