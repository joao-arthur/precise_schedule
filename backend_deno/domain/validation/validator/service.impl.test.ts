import { assertEquals } from "std/assert/assert_equals.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ValidatorProviderStub } from "@ps/domain/validation/validator/provider._stub.ts";
import { ValidatorServiceImpl } from "./service.impl.ts";

Deno.test("ValidatorServiceImpl", () => {
    assertEquals(
        new ValidatorServiceImpl(
            new ValidatorProviderStub(undefined),
        ).validate(
            null,
            { dt: [{ type: "dt" }], time: [{ type: "time" }] } as unknown as null,
        ),
        undefined,
    );
    try {
        new ValidatorServiceImpl(
            new ValidatorProviderStub(new Error("invalid")),
        ).validate(
            { a: undefined, b: undefined },
            { a: [{ type: "str" }], b: [{ type: "dt" }] },
        );
    } catch (e) {
        assertEquals(
            e,
            new ValidationError({ a: ["invalid"], b: ["invalid"] }),
        );
    }
    assertEquals(
        new ValidatorServiceImpl(
            new ValidatorProviderStub(undefined),
        ).validate(
            { dt: "1999-12-31", time: "00:00" },
            { dt: [{ type: "dt" }], time: [{ type: "time" }] },
        ),
        undefined,
    );
});
