import { assertEquals } from "std/testing/asserts.ts";
import { ValidateUserSessionServiceStub } from "./service._stub.ts";

Deno.test("ValidateUserSessionServiceStub", async () => {
    assertEquals(
        await new ValidateUserSessionServiceStub().validate(),
        undefined,
    );
});
