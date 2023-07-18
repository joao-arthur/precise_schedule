import { assertEquals } from "std/testing/asserts.ts";
import { enumValidation } from "./enumValidation.ts";
import { EnumValidationError } from "./EnumValidationError.ts";

Deno.test("enumValidation valid", () => {
    assertEquals(
        enumValidation({ v: "enum", values: [1, 2, 3] }, 2),
        undefined,
    );
    assertEquals(
        enumValidation({ v: "enum", values: ["a", "b", "c"] }, "a"),
        undefined,
    );
});

Deno.test("enumValidation null", () => {
    assertEquals(
        enumValidation({ v: "enum", values: ["a"] }, undefined),
        new EnumValidationError(["a"]),
    );
    assertEquals(
        enumValidation({ v: "enum", values: ["a"] }, null),
        new EnumValidationError(["a"]),
    );
});

Deno.test("enumValidation invalid", () => {
    assertEquals(
        enumValidation({ v: "enum", values: [1, 2, 3] }, []),
        new EnumValidationError([1, 2, 3]),
    );
    assertEquals(
        enumValidation({ v: "enum", values: ["a", "b", "c"] }, []),
        new EnumValidationError(["a", "b", "c"]),
    );
    assertEquals(
        enumValidation({ v: "enum", values: [true, false] }, []),
        new EnumValidationError([true, false]),
    );
});
