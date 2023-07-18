import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import { ValidatorImpl } from "./ValidatorImpl.ts";
import { ValidationError } from "../../domain/validation/ValidationError.ts";

Deno.test("ValidatorImpl", () => {
    assertThrows(
        () =>
            new ValidatorImpl().validate(
                { a: undefined, b: 1 },
                { a: [V.required], b: [V.required] },
            ),
        ValidationError,
    );
    assertEquals(
        new ValidatorImpl().validate(
            { a: 5, b: 10 },
            { a: [V.required], b: [V.required] },
        ),
        undefined,
    );
});
