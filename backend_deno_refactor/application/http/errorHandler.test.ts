import { assertEquals } from "@std/assert/assert-equals";
import { ValidationError } from "../../domain/validation/validate.ts";
import { InvalidSessionError } from "../../domain/session/decode.ts";
import { RepoError } from "../../domain/repository/repo.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";
import { errorHandler } from "./errorHandler.ts";

Deno.test("errorHandler", () => {
    const validation = new ValidationError({ ping: ["pong"] });
    const invalidSession = new InvalidSessionError();
    const repo = new RepoError();
    assertEquals(errorHandler(validation), badRequest({ validation: { ping: ["pong"] } }));
    assertEquals(errorHandler(invalidSession), unauthorized());
    assertEquals(errorHandler(repo), internalServerError());
});
