import { assertEquals } from "std/testing/asserts.ts";
import { UpdateUserControllerImpl } from "./UpdateUserControllerImpl.ts";
import { UpdateUserServiceMock } from "@ps/domain_mock/schedule/user/update/UpdateUserServiceMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { noContent } from "@ps/application/http/builder/200/noContent.ts";

Deno.test("UpdateUserControllerImpl", async () => {
    assertEquals(
        await new UpdateUserControllerImpl(
            new UpdateUserServiceMock(userMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
