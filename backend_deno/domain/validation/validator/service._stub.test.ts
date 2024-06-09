import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "./service._stub.ts";

Deno.test("ValidatorStub", () => {
    assertEquals(new ValidatorStub().validate(), undefined);
});
