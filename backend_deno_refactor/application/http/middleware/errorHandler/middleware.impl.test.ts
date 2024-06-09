import { assertEquals } from "@std/assert/assert-equals";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import { badRequest } from "../../response/badRequest/builder.ts";
import { unauthorized } from "../../response/unauthorized/builder.ts";
import { internalServerError } from "../../response/internalServerError/builder.ts";
import { ErrorHandlerMiddlewareImpl } from "./middleware.impl.ts";

Deno.test("new ErrorHandlerMiddlewareImpl ValidationError", () => {
    assertEquals(
        new ErrorHandlerMiddlewareImpl().handle(new ValidationError({ ping: ["pong"] })),
        badRequest({ validation: { ping: ["pong"] } }),
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
