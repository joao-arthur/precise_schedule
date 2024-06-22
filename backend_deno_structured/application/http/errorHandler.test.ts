import { assertEquals } from "@std/assert/assert-equals";
import { ValidationErr } from "../../domain/validation/validate.ts";
import { SessionDecodeErr } from "../../domain/session/service.ts";
import { RepoErr } from "../../domain/repo.ts";
import { badRequest, internalServerError, unauthorized } from "./response.ts";
import { errorHandler } from "./errorHandler.ts";

Deno.test("errorHandler", () => {
    assertEquals(
        errorHandler(
            new ValidationErr({ ping: ["pong"] }),
        ),
        badRequest({ validation: { ping: ["pong"] } }),
    );
    assertEquals(errorHandler(new SessionDecodeErr()), unauthorized());
    assertEquals(errorHandler(new RepoErr()), internalServerError());
});
