import { assertEquals } from "std/testing/asserts.ts";
import { UpdateUserControllerImpl } from "./UpdateUserControllerImpl.ts";
import { UpdateUserServiceMock } from "@ps/domain_mock/schedule/user/update/UpdateUserServiceMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";

Deno.test("UpdateUserControllerImpl", async () => {
    assertEquals(
        await new UpdateUserControllerImpl(
            new UpdateUserServiceMock(userMock),
        ).handle(userMock.id, httpRequestBodyMock),
        noContent(),
    );
});
