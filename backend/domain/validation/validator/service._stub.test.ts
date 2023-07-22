import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "./service._stub.ts";

Deno.test("ValidatorStub", () => {
    assertEquals(new ValidatorStub().validate(), undefined);
});
