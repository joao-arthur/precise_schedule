import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../../../domain/schedule/user/model.stub.ts";
import { httpRequestBodyStub } from "../../http/request/model.stub.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";
import { UserUpdateControllerImpl } from "./controller.ts";

Deno.test("UserUpdateControllerImpl", async () => {
    assertEquals(
        await new UserUpdateControllerImpl().handle(userStub.id, httpRequestBodyStub),
        noContent(),
    );
});
