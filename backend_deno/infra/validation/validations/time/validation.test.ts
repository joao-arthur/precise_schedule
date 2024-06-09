import { assertEquals } from "std/assert/assert_equals.ts";
import { timeValidation } from "./validation.ts";
import { TimeValidationError } from "./error.ts";

const v = { type: "time" } as const;

Deno.test("timeValidation valid", () => {
    assertEquals(timeValidation(v, "10:00"), undefined);
    assertEquals(timeValidation(v, "23:59"), undefined);
});

Deno.test("timeValidation null", () => {
    assertEquals(timeValidation(v, undefined), new TimeValidationError());
    assertEquals(timeValidation(v, null), new TimeValidationError());
});

Deno.test("timeValidation invalid", () => {
    assertEquals(timeValidation(v, 1), new TimeValidationError());
    assertEquals(timeValidation(v, ""), new TimeValidationError());
    assertEquals(timeValidation(v, true), new TimeValidationError());
    assertEquals(timeValidation(v, []), new TimeValidationError());
    assertEquals(timeValidation(v, {}), new TimeValidationError());
    assertEquals(timeValidation(v, new Date()), new TimeValidationError());
});
