import { assertEquals } from "@std/assert/assert-equals";
import { ValidateUserSessionServiceStub } from "./service._stub.ts";
import { buildOk } from "../lang/result.ts";

Deno.test("ValidateUserSessionServiceStub", async () => {
    assertEquals(
        await new ValidateUserSessionServiceStub().validate(),
        buildOk(undefined),
    );
});
