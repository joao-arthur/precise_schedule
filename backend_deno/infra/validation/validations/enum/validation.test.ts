import { assertEquals } from "std/assert/assert_equals.ts";
import { enumValidation } from "./validation.ts";
import { EnumValidationError } from "./error.ts";

Deno.test("enumValidation valid", () => {
    assertEquals(enumValidation({ type: "enum", values: [1, 2] }, 2), undefined);
    assertEquals(enumValidation({ type: "enum", values: ["a", "b"] }, "a"), undefined);
});

Deno.test("enumValidation null", () => {
    assertEquals(
        enumValidation({ type: "enum", values: ["a"] }, undefined),
        new EnumValidationError(["a"]),
    );
    assertEquals(
        enumValidation({ type: "enum", values: ["a"] }, null),
        new EnumValidationError(["a"]),
    );
});

Deno.test("enumValidation invalid", () => {
    assertEquals(
        enumValidation({ type: "enum", values: [1, 2] }, []),
        new EnumValidationError([1, 2]),
    );
    assertEquals(
        enumValidation({ type: "enum", values: ["a", "b"] }, []),
        new EnumValidationError(["a", "b"]),
    );
    assertEquals(
        enumValidation({ type: "enum", values: [true, false] }, []),
        new EnumValidationError([true, false]),
    );
});
