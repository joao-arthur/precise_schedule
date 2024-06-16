import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../lang/result.ts";
import { validate, ValidationError } from "./validate.ts";

Deno.test("Validate", () => {
    assertEquals(
        validate(
            { dt: [{ type: "dt" }], time: [{ type: "time" }] },
            null as unknown,
        ),
        ok(undefined),
    );
    assertEquals(
        validate(
            { a: [{ type: "str" }], b: [{ type: "dt" }] },
            { a: undefined, b: undefined },
        ),
        err(new ValidationError({ a: ["invalid"], b: ["invalid"] })),
    );
    assertEquals(
        validate(
            { dt: [{ type: "dt" }], time: [{ type: "time" }] },
            { dt: "1999-12-31", time: "00:00" },
        ),
        ok(undefined),
    );
});
