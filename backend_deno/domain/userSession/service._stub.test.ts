import { assertEquals } from "std/assert/assert_equals.ts";
import { ValidateUserSessionServiceStub } from "./service._stub.ts";

Deno.test("ValidateUserSessionServiceStub", async () => {
    assertEquals(
        await new ValidateUserSessionServiceStub().validate(),
        undefined,
    );
});
