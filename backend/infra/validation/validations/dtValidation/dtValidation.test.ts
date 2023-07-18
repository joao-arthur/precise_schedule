import { assertEquals } from "std/testing/asserts.ts";
import { dtValidation } from "./dtValidation.ts";
import { DtValidationError } from "./DtValidationError.ts";

Deno.test("dtValidation valid", () => {
    assertEquals(dtValidation({ v: "dt" }, "2000-08-22"), undefined);
    assertEquals(dtValidation({ v: "dt" }, "2023-08-22"), undefined);
});

Deno.test("dtValidation null", () => {
    assertEquals(dtValidation({ v: "dt" }, undefined), new DtValidationError());
    assertEquals(dtValidation({ v: "dt" }, null), new DtValidationError());
});

Deno.test("dtValidation invalid", () => {
    assertEquals(dtValidation({ v: "dt" }, 1), new DtValidationError());
    assertEquals(dtValidation({ v: "dt" }, ""), new DtValidationError());
    assertEquals(dtValidation({ v: "dt" }, []), new DtValidationError());
    assertEquals(dtValidation({ v: "dt" }, true), new DtValidationError());
    assertEquals(dtValidation({ v: "dt" }, new Date()), new DtValidationError());
});
