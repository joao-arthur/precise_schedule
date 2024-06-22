import { assertEquals } from "@std/assert/assert-equals";
import { UserCreateServiceStub } from "@ps/domain/schedule/user/create/service._stub.ts";
import { sessionStub } from "@ps/domain/session/model._stub.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { ok } from "../../../http/response/ok/builder.ts";
import { UserCreateControllerImpl } from "./controller.impl.ts";

Deno.test("UserCreateControllerImpl", async () => {
    assertEquals(
        await new UserCreateControllerImpl(
            new UserCreateServiceStub(sessionStub),
        ).handle(httpRequestBodyStub),
        ok(sessionStub),
    );
});
