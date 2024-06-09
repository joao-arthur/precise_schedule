import { assertEquals } from "std/testing/asserts.ts";
import { UserLoginServiceStub } from "@ps/domain/schedule/user/login/service._stub.ts";
import { sessionStub } from "@ps/domain/session/model._stub.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { ok } from "../../../http/response/ok/builder.ts";
import { UserLoginControllerImpl } from "./controller.impl.ts";

Deno.test("UserLoginControllerImpl", async () => {
    assertEquals(
        await new UserLoginControllerImpl(
            new UserLoginServiceStub(sessionStub),
        ).handle(httpRequestBodyStub),
        ok(sessionStub),
    );
});
