import { assertEquals } from "std/testing/asserts.ts";
import { strMinSpecialValidation } from "./strMinSpecialValidation.ts";
import { StrMinSpecialValidationError } from "./StrMinSpecialValidationError.ts";

const v = { v: "strMinSpecial", min: 1 } as const;

Deno.test("strMinSpecialValidation valid", () => {
    assertEquals(strMinSpecialValidation(v, "!"), undefined);
    assertEquals(strMinSpecialValidation(v, "I l@ve it!"), undefined);
    assertEquals(strMinSpecialValidation(v, "nevermore!"), undefined);
    assertEquals(
        strMinSpecialValidation(
            { v: "strMinSpecial", min: 30 },
            "!@#$%¨&*()[]{}+-*<>,.;:'\"`~^?´",
        ),
        undefined,
    );
});

Deno.test("strMinSpecialValidation invalid min", () => {
    assertEquals(strMinSpecialValidation(v, ""), new StrMinSpecialValidationError(v.min));
    assertEquals(
        strMinSpecialValidation(v, "lorem ipsum"),
        new StrMinSpecialValidationError(v.min),
    );
});

Deno.test("strMinSpecialValidation null", () => {
    assertEquals(strMinSpecialValidation(v, undefined), new StrMinSpecialValidationError(v.min));
    assertEquals(strMinSpecialValidation(v, null), new StrMinSpecialValidationError(v.min));
});

Deno.test("strMinSpecialValidation invalid", () => {
    assertEquals(strMinSpecialValidation(v, 1), new StrMinSpecialValidationError(v.min));
    assertEquals(strMinSpecialValidation(v, true), new StrMinSpecialValidationError(v.min));
    assertEquals(strMinSpecialValidation(v, []), new StrMinSpecialValidationError(v.min));
    assertEquals(strMinSpecialValidation(v, {}), new StrMinSpecialValidationError(v.min));
    assertEquals(strMinSpecialValidation(v, new Date()), new StrMinSpecialValidationError(v.min));
});
