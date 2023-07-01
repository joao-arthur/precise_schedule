import { assertEquals } from "std/testing/asserts.ts";
import { required } from "./required.ts";
import { RequiredError } from "./RequiredError.ts";

Deno.test("required", () => {
    assertEquals(required("required", []), undefined);

    assertEquals(required("a", undefined), new RequiredError("a"));
    assertEquals(required("b", null), new RequiredError("b"));
});
