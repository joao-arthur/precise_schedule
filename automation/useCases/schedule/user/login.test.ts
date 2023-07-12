import { assertEquals } from "std/testing/asserts.ts";
import { loginEndpoint } from "../../../domain/schedule/user/login.endpoint.ts";

Deno.test("Login unregistered user", async () => {
    assertEquals(
        await loginEndpoint(
            { username: "john", password: "0123456789" },
        ),
        { message: "The user was not found!" },
    );
});
