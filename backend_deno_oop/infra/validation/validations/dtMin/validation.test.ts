import { assertEquals } from "@std/assert/assert-equals";
import { dtMinValidation } from "./validation.ts";
import { DtMinValidationError } from "./error.ts";

const v = { type: "dtMin", min: "1970-01-01" } as const;

Deno.test("dtMinValidation valid", () => {
    assertEquals(dtMinValidation(v, "1970-01-01"), undefined);
    assertEquals(dtMinValidation(v, "2000-08-22"), undefined);
});

Deno.test("dtMinValidation invalid min", () => {
    assertEquals(dtMinValidation(v, "1969-12-31"), new DtMinValidationError(v.min));
});

Deno.test("dtMinValidation null", () => {
    assertEquals(dtMinValidation(v, undefined), new DtMinValidationError(v.min));
    assertEquals(dtMinValidation(v, null), new DtMinValidationError(v.min));
});

Deno.test("dtMinValidation invalid format", () => {
    assertEquals(dtMinValidation(v, 1), new DtMinValidationError(v.min));
    assertEquals(dtMinValidation(v, ""), new DtMinValidationError(v.min));
    assertEquals(dtMinValidation(v, []), new DtMinValidationError(v.min));
    assertEquals(dtMinValidation(v, true), new DtMinValidationError(v.min));
    assertEquals(dtMinValidation(v, new Date()), new DtMinValidationError(v.min));
});
