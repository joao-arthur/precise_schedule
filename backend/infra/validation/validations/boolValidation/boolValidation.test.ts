import { assertEquals } from "std/testing/asserts.ts";
import { boolValidation } from "./boolValidation.ts";
import { BoolValidationError } from "./BoolValidationError.ts";

const v = { type: "bool" } as const;

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
