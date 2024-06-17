import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../domain/session/model.stub.ts";
import { httpRequestBodyStub } from "../../../http/request/model.stub.ts";
import { ok } from "../../../http/response.ts";
import { UserCreateControllerImpl } from "./controller.ts";

Deno.test("UserCreateControllerImpl", async () => {
    assertEquals(
        await new UserCreateControllerImpl().handle(httpRequestBodyStub),
        ok(sessionStub),
    );
});
