import { assertEquals } from "@std/assert/assert-equals";
import { ValidationError } from "../../domain/validation/validate.ts";
import { InvalidSessionError } from "../../domain/session/decode.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";
import { errorMiddleware } from "./middleware.error.ts";

Deno.test("errorMiddleware", () => {
    assertEquals(
        errorMiddleware(new ValidationError({ ping: ["pong"] })),
        badRequest({ validation: { ping: ["pong"] } }),
    );
    assertEquals(
        errorMiddleware(new InvalidSessionError()),
        unauthorized(),
    );
    assertEquals(
        errorMiddleware(new Error()),
        internalServerError(),
    );
});
