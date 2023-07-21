import { assertEquals } from "std/testing/asserts.ts";
import { ValidateUserSessionServiceMock } from "./ValidateUserSessionServiceMock.ts";

Deno.test("ValidateUserSessionServiceMock", async () => {
    assertEquals(
        await new ValidateUserSessionServiceMock().validate(),
        undefined,
    );
});
