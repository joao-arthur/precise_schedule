import { assertEquals } from "std/assert/assert_equals.ts";
import { strMinSpecialValidation } from "./validation.ts";
import { StrMinSpecialValidationError } from "./error.ts";

const v = { type: "strMinSpecial", min: 1 } as const;

Deno.test("strMinSpecialValidation valid", () => {
    assertEquals(strMinSpecialValidation(v, "!"), undefined);
    assertEquals(strMinSpecialValidation(v, "I l@ve it!"), undefined);
    assertEquals(strMinSpecialValidation(v, "nevermore!"), undefined);
    assertEquals(
        strMinSpecialValidation(
            { type: "strMinSpecial", min: 14 },
            "!@#$%¨&*()[]{}",
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
