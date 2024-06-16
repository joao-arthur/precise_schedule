import type { BoolVal } from "./bool.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { boolValidation, BoolValidationError } from "./bool.ts";

const v: BoolVal = { type: "bool" };

Deno.test("boolValidation valid", () => {
    assertEquals(boolValidation(v, true), undefined);
    assertEquals(boolValidation(v, false), undefined);
});

Deno.test("boolValidation null", () => {
    assertEquals(boolValidation(v, undefined), new BoolValidationError());
    assertEquals(boolValidation(v, null), new BoolValidationError());
});

Deno.test("boolValidation invalid", () => {
    assertEquals(boolValidation(v, 1), new BoolValidationError());
    assertEquals(boolValidation(v, ""), new BoolValidationError());
    assertEquals(boolValidation(v, []), new BoolValidationError());
    assertEquals(boolValidation(v, {}), new BoolValidationError());
    assertEquals(boolValidation(v, new Date()), new BoolValidationError());
});
