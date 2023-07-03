import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorMock } from "@ps/domain_mock/validation/ValidatorMock.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
//import { sessionMock } from "@ps/domain_mock/session/SessionMock.ts";
import { FindUserServiceMock } from "@ps/domain_mock/schedule/user/find/FindUserServiceMock.ts";
import { loginModelMock } from "@ps/domain_mock/schedule/user/login/LoginModelMock.ts";
import { LoginServiceImpl } from "./LoginServiceImpl.ts";

Deno.test("validateUniqueUsername", async () => {
    assertEquals(
        await new LoginServiceImpl(
            new ValidatorMock(),
            new FindUserServiceMock(userMock),
        ).login(loginModelMock),
        { token: "mock token" },
    );
});
