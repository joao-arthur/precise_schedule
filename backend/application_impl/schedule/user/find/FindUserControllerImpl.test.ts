import { assertEquals } from "std/testing/asserts.ts";
import { FindUserControllerImpl } from "./FindUserControllerImpl.ts";
import { FindUserServiceMock } from "@ps/domain_mock/schedule/user/find/FindUserServiceMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { httpRequestParamsMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

Deno.test("FindUserControllerImpl", async () => {
    assertEquals(
        await new FindUserControllerImpl(
            new FindUserServiceMock(userMock),
        ).handle(httpRequestParamsMock),
        ok(userMock),
    );
});
