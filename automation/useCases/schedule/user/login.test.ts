import { assertEquals } from "std/testing/asserts.ts";

Deno.test("Login unregistered user", async () => {
    assertEquals(
        await fetch(
            "http://localhost:8080/user/login",
            {
                method: "POST",
                body: JSON.stringify({ username: "john", password: "0123456789s" }),
            },
        ).then((res) => res.json()),
        { message: "The user was not found!" },
    );
});
