import { assertEquals } from "std/testing/asserts.ts";
import { UpdateUserControllerImpl } from "./UpdateUserControllerImpl.ts";
import { UpdateUserServiceMock } from "@ps/domain_mock/schedule/user/update/UpdateUserServiceMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { ok } from "@ps/application/http/builder/ok.ts";

Deno.test("UpdateUserControllerImpl", async () => {
    assertEquals(
        await new UpdateUserControllerImpl(
            new UpdateUserServiceMock(userMock),
        ).handle(httpRequestFullMock),
        ok(userMock),
    );
});
