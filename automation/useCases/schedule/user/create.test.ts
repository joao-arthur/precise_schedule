import { assertEquals } from "std/testing/asserts.ts";
import { createUserEndpoint } from "../../../domain/schedule/user/user.create.endpoint.ts";

Deno.test("Create user", async () => {
    const session = await createUserEndpoint({
        username: "paul",
        password: "0123456789",
        email: "paul@gmail.com",
    });
    assertEquals("token" in session, true);
});
