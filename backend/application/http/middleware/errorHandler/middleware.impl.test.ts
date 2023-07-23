import { assertEquals } from "std/testing/asserts.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { BusinessError } from "@ps/domain/general/business/error.ts";
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
