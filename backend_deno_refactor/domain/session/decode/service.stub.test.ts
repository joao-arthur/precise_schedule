import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../../schedule/user/model.stub.ts";
import { DecodeSessionServiceStub } from "./service.stub.ts";
import { ok } from "../../lang/result.ts";

Deno.test("DecodeSessionServiceStub", async () => {
    const decodeSessionServiceStub = new DecodeSessionServiceStub(
        userStub.id,
    );
    assertEquals(
        await decodeSessionServiceStub.decode(),
        ok(userStub.id),
    );
});