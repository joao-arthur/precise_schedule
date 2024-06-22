import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { session, sessionStubBuild } from "./service.stub.ts";

Deno.test("sessionStubBuild", async () => {
    assertEquals(await sessionStubBuild(session, "user-id").create("user-id"), ok(session));
    assertEquals(await sessionStubBuild(session, "user-id").decode(session), ok("user-id"));
});
