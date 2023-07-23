import { assertEquals } from "std/testing/asserts.ts";
import { compareBiggerValidation } from "./validation.ts";
import { CompareBiggerValidationError } from "./error.ts";

const v = { type: "compareBigger", field: "b" } as const;

Deno.test("compareBiggerValidation valid", () => {
    assertEquals(compareBiggerValidation(v, "2023-08-22", "1917-11-07"), undefined);
    assertEquals(compareBiggerValidation(v, "22:10", "08:00"), undefined);
});

Deno.test("compareBiggerValidation null", () => {
    assertEquals(
        compareBiggerValidation(v, undefined, undefined),
        new CompareBiggerValidationError(v.field),
    );
    assertEquals(
        compareBiggerValidation(v, null, undefined),
        new CompareBiggerValidationError(v.field),
    );
    assertEquals(
        compareBiggerValidation(v, undefined, null),
        new CompareBiggerValidationError(v.field),
    );
    assertEquals(compareBiggerValidation(v, null, null), new CompareBiggerValidationError(v.field));
});

Deno.test("compareBiggerValidation invalid", () => {
    assertEquals(
        compareBiggerValidation(v, "1917-11-07", "2023-08-22"),
        new CompareBiggerValidationError(v.field),
    );
    assertEquals(
        compareBiggerValidation(v, "08:00", "22:10"),
        new CompareBiggerValidationError(v.field),
    );
});
