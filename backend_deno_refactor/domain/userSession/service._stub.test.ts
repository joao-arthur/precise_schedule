import { assertEquals } from "@std/assert/assert-equals";
import { ValidateUserSessionServiceStub } from "./service._stub.ts";

Deno.test("ValidateUserSessionServiceStub", async () => {
    assertEquals(
        await new ValidateUserSessionServiceStub().validate(),
        undefined,
    );
});
