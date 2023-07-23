import { assertEquals } from "std/testing/asserts.ts";
import { emailValidation } from "./validation.email.ts";
import { EmailValidationError } from "./error.validation.email.ts";

const v = { type: "email" } as const;

Deno.test("emailValidation valid", () => {
    assertEquals(emailValidation(v, "a@b.c"), undefined);
    assertEquals(emailValidation(v, "example@example.com"), undefined);
    assertEquals(emailValidation(v, "john@gmail.com"), undefined);
});

Deno.test("emailValidation invalid min", () => {
    assertEquals(emailValidation(v, "j.o@i"), new EmailValidationError());
});

Deno.test("emailValidation null", () => {
    assertEquals(emailValidation(v, undefined), new EmailValidationError());
    assertEquals(emailValidation(v, null), new EmailValidationError());
});

Deno.test("emailValidation invalid format", () => {
    assertEquals(emailValidation(v, 1), new EmailValidationError());
    assertEquals(emailValidation(v, ""), new EmailValidationError());
    assertEquals(emailValidation(v, []), new EmailValidationError());
    assertEquals(emailValidation(v, true), new EmailValidationError());
    assertEquals(emailValidation(v, new Date()), new EmailValidationError());
});
