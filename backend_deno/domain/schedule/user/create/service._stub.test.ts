import { assertEquals } from "std/assert/assert_equals.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserCreateServiceStub } from "./service._stub.ts";

Deno.test("UserCreateServiceStub", async () => {
    assertEquals(
        await new UserCreateServiceStub(sessionStub).create(),
        sessionStub,
    );
});
