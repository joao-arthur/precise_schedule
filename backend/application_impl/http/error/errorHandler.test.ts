import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { BusinessError } from "@ps/domain/general/BusinessError.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";

import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { unauthorized } from "@ps/application/http/builder/unauthorized.ts";
import { errorHandler } from "./errorHandler.ts";

Deno.test("errorHandler ValidationError", async () => {
    assertEquals(
        await errorHandler(() =>
            Promise.reject(new ValidationError({ ping: ["pong"] }))
        ),
        badRequest({ ping: ["pong"] }),
    );
});

Deno.test("errorHandler BusinessError", async () => {
    assertEquals(
        await errorHandler(() =>
            Promise.reject(new BusinessError("Thela Hun Ginjeet"))
        ),
        badRequest({ message: "Thela Hun Ginjeet" }),
    );
});

Deno.test("errorHandler InvalidSessionError", async () => {
    assertEquals(
        await errorHandler(() =>
            Promise.reject(new InvalidSessionError())
        ),
        unauthorized(),
    );
});

Deno.test("errorHandler reject", async () => {
    assertEquals(
        await errorHandler(() => Promise.reject(new Error())),
        internalServerError(),
    );
});

Deno.test("errorHandler resolve", async () => {
    assertEquals(
        await errorHandler(() =>
            Promise.resolve(ok({ arguments: "talk" }))
        ),
        ok({ arguments: "talk" }),
    );
});
