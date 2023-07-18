import { assertEquals } from "std/testing/asserts.ts";
import { isEnum } from "./enum.ts";
import { EnumError } from "./EnumError.ts";

Deno.test("isEnum valid", () => {
    assertEquals(isEnum([1, 2, 3])(2), undefined);
    assertEquals(isEnum(["a", "b", "c"])("a"), undefined);
});

Deno.test("isEnum null", () => {
    assertEquals(isEnum(["a"])(undefined), new EnumError(["a"]));
    assertEquals(isEnum(["a"])(null), new EnumError(["a"]));
});

Deno.test("isEnum invalid", () => {
    assertEquals(isEnum([1, 2, 3])([]), new EnumError([1, 2, 3]));
    assertEquals(isEnum(["a", "b", "c"])([]), new EnumError(["a", "b", "c"]));
    assertEquals(isEnum([true, false])([]), new EnumError([true, false]));
});
