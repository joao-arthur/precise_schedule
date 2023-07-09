import { assertRejects } from "std/testing/asserts.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { ValidateUserSessionServiceMock } from "@ps/domain_mock/userSession/ValidateUserSessionServiceMock.ts";
import { SessionMiddlewareImpl } from "./SessionMiddlewareImpl.ts";

Deno.test("SessionMiddlewareImpl", async () => {
    await assertRejects(() =>
        new SessionMiddlewareImpl(
            new ValidateUserSessionServiceMock(),
        ).handle(
            { headers: { Authorization: undefined } },
        ), InvalidSessionError);
});
