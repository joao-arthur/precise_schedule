import { assertEquals } from "std/testing/asserts.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { BusinessError } from "@ps/domain/general/BusinessError.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { badRequest } from "@ps/application_impl/http/builder/400/badRequest.ts";
import { unauthorized } from "@ps/application_impl/http/builder/400/unauthorized.ts";
import { internalServerError } from "@ps/application_impl/http/builder/500/internalServerError.ts";
import { ErrorHandlerMiddlewareImpl } from "./ErrorHandlerMiddlewareImpl.ts";

Deno.test("new ErrorHandlerMiddlewareImpl ValidationError", () => {
    assertEquals(
        new ErrorHandlerMiddlewareImpl().handle(new ValidationError({ ping: ["pong"] })),
        badRequest({ validation: { ping: ["pong"] } }),
    );
});

Deno.test("new ErrorHandlerMiddlewareImpl BusinessError", () => {
    assertEquals(
        new ErrorHandlerMiddlewareImpl().handle(new BusinessError("Thela Hun Ginjeet")),
        badRequest({ message: "Thela Hun Ginjeet" }),
    );
});

Deno.test("new ErrorHandlerMiddlewareImpl InvalidSessionError", () => {
    assertEquals(
        new ErrorHandlerMiddlewareImpl().handle(new InvalidSessionError()),
        unauthorized(),
    );
});

Deno.test("new ErrorHandlerMiddlewareImpl Error", () => {
    assertEquals(
        new ErrorHandlerMiddlewareImpl().handle(new Error()),
        internalServerError(),
    );
});
