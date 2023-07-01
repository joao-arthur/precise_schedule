import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorSuccess } from "./ValidatorSuccess.ts";

Deno.test("ValidatorSuccess", () => {
    assertEquals(new ValidatorSuccess().validate(), undefined);
});
