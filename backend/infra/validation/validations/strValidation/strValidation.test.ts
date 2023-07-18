import { assertEquals } from "std/testing/asserts.ts";
import { strValidation } from "./strValidation.ts";
import { StrValidationError } from "./StrValidationError.ts";

Deno.test("strValidation valid", () => {
    assertEquals(strValidation({ v: "str" }, ""), undefined);
    assertEquals(strValidation({ v: "str" }, "lorem"), undefined);
});

Deno.test("strValidation null", () => {
    assertEquals(strValidation({ v: "str" }, undefined), new StrValidationError());
    assertEquals(strValidation({ v: "str" }, null), new StrValidationError());
});

Deno.test("strValidation invalid", () => {
    assertEquals(strValidation({ v: "str" }, 1), new StrValidationError());
    assertEquals(strValidation({ v: "str" }, []), new StrValidationError());
    assertEquals(strValidation({ v: "str" }, true), new StrValidationError());
    assertEquals(strValidation({ v: "str" }, new Date()), new StrValidationError());
});
