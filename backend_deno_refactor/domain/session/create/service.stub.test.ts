import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { sessionCreateStubBuild } from "./service.stub.ts";
import { sessionStub } from "../model.stub.ts";

Deno.test("sessionCreateStubBuild", async () => {
    assertEquals(
        await sessionCreateStubBuild(sessionStub).create("user-id"),
        ok(sessionStub),
    );
});
