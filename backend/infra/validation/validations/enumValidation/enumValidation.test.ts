import { assertEquals } from "std/testing/asserts.ts";
import { enumValidation } from "./enumValidation.ts";
import { EnumValidationError } from "./EnumValidationError.ts";

Deno.test("enumValidation valid", () => {
    assertEquals(enumValidation({ v: "enum", values: [1, 2] }, 2), undefined);
    assertEquals(enumValidation({ v: "enum", values: ["a", "b"] }, "a"), undefined);
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
        enumValidation({ v: "enum", values: [1, 2] }, []),
        new EnumValidationError([1, 2]),
    );
    assertEquals(
        enumValidation({ v: "enum", values: ["a", "b"] }, []),
        new EnumValidationError(["a", "b"]),
    );
    assertEquals(
        enumValidation({ v: "enum", values: [true, false] }, []),
        new EnumValidationError([true, false]),
    );
});
