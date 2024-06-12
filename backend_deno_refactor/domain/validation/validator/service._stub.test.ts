import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "./service._stub.ts";
import { ok } from "../../lang/result.ts";

Deno.test("ValidatorStub", () => {
    assertEquals(
        new ValidatorStub().validate(),
        ok(undefined),
    );
});
