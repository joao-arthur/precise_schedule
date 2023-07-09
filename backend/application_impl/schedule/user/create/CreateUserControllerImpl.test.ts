import { assertEquals } from "std/testing/asserts.ts";
import { CreateUserServiceMock } from "@ps/domain_mock/schedule/user/create/CreateUserServiceMock.ts";
import { sessionMock } from "@ps/domain_mock/session/SessionMock.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application/http/builder/200/ok.ts";
import { CreateUserControllerImpl } from "./CreateUserControllerImpl.ts";

Deno.test("CreateUserControllerImpl", async () => {
    assertEquals(
        await new CreateUserControllerImpl(
            new CreateUserServiceMock(sessionMock),
        ).handle(httpRequestBodyMock),
        ok(sessionMock),
    );
});
