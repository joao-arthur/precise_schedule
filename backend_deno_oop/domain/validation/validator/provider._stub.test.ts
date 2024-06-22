import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorProviderStub } from "./provider._stub.ts";

Deno.test("ValidatorProviderStub", () => {
    assertEquals(new ValidatorProviderStub(undefined).execute(), undefined);
    assertEquals(
        new ValidatorProviderStub(new Error("oopsie daisy!")).execute(),
        new Error("oopsie daisy!"),
    );
});
