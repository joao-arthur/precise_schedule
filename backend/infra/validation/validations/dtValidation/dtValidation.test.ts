import { assertEquals } from "std/testing/asserts.ts";
import { dtValidation } from "./dtValidation.ts";
import { DtValidationError } from "./DtValidationError.ts";

Deno.test("dtValidation valid", () => {
    assertEquals(dtValidation(new Date()), undefined);
    assertEquals(dtValidation(new Date("2000-08-22T00:00:00.000Z")), undefined);
});

Deno.test("dtValidation null", () => {
    assertEquals(dtValidation(undefined), new DtValidationError());
    assertEquals(dtValidation(null), new DtValidationError());
});

Deno.test("dtValidation invalid", () => {
    assertEquals(dtValidation(1), new DtValidationError());
    assertEquals(dtValidation(""), new DtValidationError());
    assertEquals(dtValidation([]), new DtValidationError());
    assertEquals(dtValidation(true), new DtValidationError());
});
