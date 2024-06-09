import { assertEquals } from "std/testing/asserts.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserCreateServiceStub } from "./service._stub.ts";

Deno.test("UserCreateServiceStub", async () => {
    assertEquals(
        await new UserCreateServiceStub(sessionStub).create(),
        sessionStub,
    );
});
