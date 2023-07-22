import { assertEquals } from "std/testing/asserts.ts";
import { ValidationError } from "../../domain/validation/ValidationError.ts";
import { ValidatorImpl } from "./service.impl.ts";

Deno.test("ValidatorImpl", () => {
    try {
        new ValidatorImpl().validate(
            { a: undefined, b: "1991-12-25" },
            { a: [{ v: "str" }], b: [{ v: "dt" }] },
        );
    } catch (e) {
        assertEquals(
            e,
            new ValidationError({ a: ["must be a string"] }),
        );
    }
    assertEquals(
        new ValidatorImpl().validate(
            { dt: "1999-12-31", time: "23:59" },
            { dt: [{ v: "dt" }], time: [{ v: "time" }] },
        ),
        undefined,
    );
});
