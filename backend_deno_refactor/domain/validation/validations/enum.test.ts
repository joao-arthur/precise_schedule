import type { EnumVal } from "./enum.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { enumValidation, EnumValidationError } from "./enum.ts";

const vNum: EnumVal = { type: "enum", values: [1, 2] };
const vStr: EnumVal = { type: "enum", values: ["a", "b"] };
const vBool: EnumVal = { type: "enum", values: [true, false] };

Deno.test("enumValidation valid", () => {
    assertEquals(enumValidation(vNum, 2), undefined);
    assertEquals(enumValidation(vStr, "a"), undefined);
});

Deno.test("enumValidation null", () => {
    assertEquals(enumValidation(vNum, undefined), new EnumValidationError([1, 2]));
    assertEquals(enumValidation(vNum, null), new EnumValidationError([1, 2]));
    assertEquals(enumValidation(vStr, undefined), new EnumValidationError(["a", "b"]));
    assertEquals(enumValidation(vStr, null), new EnumValidationError(["a", "b"]));
    assertEquals(enumValidation(vBool, undefined), new EnumValidationError([true, false]));
    assertEquals(enumValidation(vBool, null), new EnumValidationError([true, false]));
});

Deno.test("enumValidation invalid", () => {
    assertEquals(enumValidation(vNum, []), new EnumValidationError([1, 2]));
    assertEquals(enumValidation(vStr, []), new EnumValidationError(["a", "b"]));
    assertEquals(enumValidation(vBool, []), new EnumValidationError([true, false]));
});
