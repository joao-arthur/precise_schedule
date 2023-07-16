import { assertEquals } from "std/testing/asserts.ts";
import { createUserEndpoint } from "../../../domain/schedule/user/user.create.endpoint.ts";
import { loginEndpoint } from "../../../domain/schedule/user/login.endpoint.ts";

Deno.test("User", async (t) => {
    await t.step("Login unregistered user", async () => {
        assertEquals(
            await loginEndpoint(
                { username: "paul", password: "0123456789" },
            ),
            {
                status: 400,
                body: { message: "The user was not found!" },
                headers: { contentLocation: undefined },
            },
        );
    });

    await t.step("Register user", async () => {
        const res = await createUserEndpoint({
            username: "paul",
            password: "0123456789",
            email: "paul@gmail.com",
        });
        assertEquals(res.status, 200);
        assertEquals(typeof (res.body as any).token, "string");
    });

    await t.step("Login user", async () => {
        const res = await loginEndpoint(
            { username: "paul", password: "0123456789" },
        );
        assertEquals(res.status, 200);
        assertEquals(typeof (res.body as any).token, "string");
    });
});
