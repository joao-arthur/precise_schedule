import { assertEquals } from "@std/assert/assert-equals";
import { SessionCreateServiceStub } from "./service._stub.ts";
import { sessionStub } from "../model._stub.ts";

Deno.test("SessionCreateServiceStub", async () => {
    const sessionCreateServiceStub = new SessionCreateServiceStub(
        sessionStub,
    );
    assertEquals(
        await sessionCreateServiceStub.create(),
        sessionStub,
    );
});
