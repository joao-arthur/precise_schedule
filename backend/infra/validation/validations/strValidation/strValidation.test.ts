import { assertEquals } from "std/testing/asserts.ts";
import { str } from "./str.ts";
import { StrError } from "./StrError.ts";

Deno.test("str valid", () => {
    assertEquals(str(""), undefined);
    assertEquals(str("lorem"), undefined);
});

Deno.test("str null", () => {
    assertEquals(str(undefined), new StrError());
    assertEquals(str(null), new StrError());
});

Deno.test("str invalid", () => {
    assertEquals(str(1), new StrError());
    assertEquals(str([]), new StrError());
    assertEquals(str(true), new StrError());
    assertEquals(str(new Date()), new StrError());
});
