import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../lang/result.ts";
import { validateSchema, ValidationErr } from "./validate.ts";

Deno.test("Validate", () => {
    assertEquals(
        validateSchema(
            { dt: [{ type: "dt" }], time: [{ type: "time" }] },
            null as unknown,
        ),
        err(
            new ValidationErr({
                dt: ["must be a date in the format YYYY-MM-DD"],
                time: ["must be a time in the format HH:mm"],
            }),
        ),
    );
    assertEquals(
        validateSchema(
            { a: [{ type: "str" }], b: [{ type: "dt" }] },
            { a: undefined, b: undefined },
        ),
        err(
            new ValidationErr({
                a: ["must be a string"],
                b: ["must be a date in the format YYYY-MM-DD"],
            }),
        ),
    );
    assertEquals(
        validateSchema(
            { dt: [{ type: "dt" }], time: [{ type: "time" }] },
            { dt: "1999-12-31", time: "00:00" },
        ),
        ok(undefined),
    );
});
