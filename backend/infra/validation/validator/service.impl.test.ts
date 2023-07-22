import { assertEquals } from "std/testing/asserts.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ValidatorServiceImpl } from "./service.impl.ts";

Deno.test("ValidatorServiceImpl", () => {
    try {
        new ValidatorServiceImpl().validate(
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
        new ValidatorServiceImpl().validate(
            { dt: "1999-12-31", time: "23:59" },
            { dt: [{ v: "dt" }], time: [{ v: "time" }] },
        ),
        undefined,
    );
});
