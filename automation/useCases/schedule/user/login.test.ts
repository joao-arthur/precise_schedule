import { assertEquals } from "std/testing/asserts.ts";
import { request } from "../../../infra/request.ts";

Deno.test("Login unregistered user", async () => {
    assertEquals(
        await request.post("user/login", {
            username: "john",
            password: "0123456789s",
        }),
        { message: "The user was not found!" },
    );
});
