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

Deno.test("Create user validation", async () => {
    assertEquals(
        await createUserEndpoint({} as any),
        {
            status: 400,
            body: {
                validation: {
                    firstName: [
                        "must be a string",
                        "at least 1 character",
                    ],
                    birthdate: [
                        "must be a date in the format YYYY-MM-DD",
                        "must be > 1970-01-01",
                    ],
                    email: [
                        "must be a string",
                        "must be in the format of a email",
                        "at least 3 characters",
                    ],
                    username: [
                        "must be a string",
                        "at least 1 character",
                    ],
                    password: [
                        "must be a string",
                        "at least 8 characters",
                        "at least 1 number",
                        "at least 1 uppercase letter",
                        "at least 1 lowercase letter",
                        "at least 1 special character",
                    ],
                },
            },
            headers: { contentLocation: undefined },
        },
    );
});

Deno.test("Login validation", async () => {
    assertEquals(
        await loginEndpoint({} as any),
        {
            status: 400,
            body: {
                validation: {
                    username: [
                        "must be a string",
                        "at least 1 character",
                    ],
                    password: [
                        "must be a string",
                        "at least 8 characters",
                        "at least 1 number",
                        "at least 1 uppercase letter",
                        "at least 1 lowercase letter",
                        "at least 1 special character",
                    ],
                },
            },
            headers: { contentLocation: undefined },
        },
    );
});
