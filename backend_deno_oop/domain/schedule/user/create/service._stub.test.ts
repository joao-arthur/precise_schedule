import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserCreateServiceStub } from "./service._stub.ts";

Deno.test("UserCreateServiceStub", async () => {
    assertEquals(
        await new UserCreateServiceStub(sessionStub).create(),
        sessionStub,
    );
});
