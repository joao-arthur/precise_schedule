import { assertEquals } from "std/assert/assert_equals.ts";
import { userStub } from "@ps/domain/schedule/user/model._stub.ts";
import { UserUpdateServiceStub } from "@ps/domain/schedule/user/update/service._stub.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";
import { UserUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("UserUpdateControllerImpl", async () => {
    assertEquals(
        await new UserUpdateControllerImpl(
            new UserUpdateServiceStub(userStub),
        ).handle(userStub.id, httpRequestBodyStub),
        noContent(),
    );
});
