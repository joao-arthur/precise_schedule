import { assertEquals } from "std/testing/asserts.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserLoginServiceStub } from "./service._stub.ts";

Deno.test("UserLoginServiceStub", async () => {
    assertEquals(
        await new UserLoginServiceStub(sessionStub).userLogin(),
        sessionStub,
    );
});
