import { assertEquals } from "@std/assert/assert-equals";
import { dtValidation } from "./validation.ts";
import { DtValidationError } from "./error.ts";

const v = { type: "dt" } as const;

Deno.test("dtValidation valid", () => {
    assertEquals(dtValidation(v, "1917-11-07"), undefined);
    assertEquals(dtValidation(v, "2023-08-22"), undefined);
});

Deno.test("dtValidation null", () => {
    assertEquals(dtValidation(v, undefined), new DtValidationError());
    assertEquals(dtValidation(v, null), new DtValidationError());
});

Deno.test("dtValidation invalid", () => {
    assertEquals(dtValidation(v, 1), new DtValidationError());
    assertEquals(dtValidation(v, ""), new DtValidationError());
    assertEquals(dtValidation(v, true), new DtValidationError());
    assertEquals(dtValidation(v, []), new DtValidationError());
    assertEquals(dtValidation(v, {}), new DtValidationError());
    assertEquals(dtValidation(v, new Date()), new DtValidationError());
});
