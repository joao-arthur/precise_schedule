import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorMock } from "./ValidatorMock.ts";

Deno.test("ValidatorMock", () => {
    assertEquals(new ValidatorMock().validate(), undefined);
});
