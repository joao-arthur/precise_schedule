import { assertEquals } from "std/testing/asserts.ts";
import { boolValidation } from "./boolValidation.ts";
import { BoolValidationError } from "./BoolValidationError.ts";

Deno.test("boolValidation valid", () => {
    assertEquals(boolValidation({ v: "bool" }, true), undefined);
    assertEquals(boolValidation({ v: "bool" }, false), undefined);
});

Deno.test("boolValidation null", () => {
    assertEquals(boolValidation({ v: "bool" }, undefined), new BoolValidationError());
    assertEquals(boolValidation({ v: "bool" }, null), new BoolValidationError());
});

Deno.test("boolValidation invalid", () => {
    assertEquals(boolValidation({ v: "bool" }, 1), new BoolValidationError());
    assertEquals(boolValidation({ v: "bool" }, ""), new BoolValidationError());
    assertEquals(boolValidation({ v: "bool" }, []), new BoolValidationError());
    assertEquals(boolValidation({ v: "bool" }, new Date()), new BoolValidationError());
});
