import { assertEquals } from "@std/assert/assert-equals";
import { ValidationError } from "../../domain/validation/validate.ts";
import { SessionDecodeError } from "../../domain/session/service.ts";
import { RepoError } from "../../domain/repository/repo.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";
import { errorHandler } from "./errorHandler.ts";

Deno.test("errorHandler", () => {
    assertEquals(
        errorHandler(
            new ValidationError({ ping: ["pong"] }),
        ),
        badRequest({ validation: { ping: ["pong"] } }),
    );
    assertEquals(errorHandler(new SessionDecodeError()), unauthorized());
    assertEquals(errorHandler(new RepoError()), internalServerError());
});
