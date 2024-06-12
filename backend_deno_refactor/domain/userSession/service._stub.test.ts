import { assertEquals } from "@std/assert/assert-equals";
import { ValidateUserSessionServiceStub } from "./service._stub.ts";
import { ok } from "../lang/result.ts";

Deno.test("ValidateUserSessionServiceStub", async () => {
    assertEquals(
        await new ValidateUserSessionServiceStub().validate(),
        ok(undefined),
    );
});
