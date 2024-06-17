import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../domain/session/model.stub.ts";
import { httpRequestBodyStub } from "../../../http/request/model.stub.ts";
import { ok } from "../../../http/response.ts";
import { UserLoginControllerImpl } from "./controller.ts";

Deno.test("UserLoginControllerImpl", async () => {
    assertEquals(
        await new UserLoginControllerImpl().handle(httpRequestBodyStub),
        ok(sessionStub),
    );
});
