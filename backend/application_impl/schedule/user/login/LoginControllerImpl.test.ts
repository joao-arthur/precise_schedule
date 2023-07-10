import { assertEquals } from "std/testing/asserts.ts";
import { LoginServiceMock } from "@ps/domain_mock/schedule/user/login/LoginServiceMock.ts";
import { sessionMock } from "@ps/domain_mock/session/SessionMock.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application_impl/http/builder/200/ok.ts";
import { LoginControllerImpl } from "./LoginControllerImpl.ts";

Deno.test("LoginControllerImpl", async () => {
    assertEquals(
        await new LoginControllerImpl(
            new LoginServiceMock(sessionMock),
        ).handle(httpRequestBodyMock),
        ok(sessionMock),
    );
});
