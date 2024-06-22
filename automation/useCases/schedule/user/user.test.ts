import { assertEquals } from "@std/assert/assert-equals";
import { createUserEndpoint } from "../../../domain/schedule/user/user.create.endpoint.ts";
import { loginEndpoint } from "../../../domain/schedule/user/login.endpoint.ts";

Deno.test("User", async (t) => {
    await t.step("Login unregistered user", async () => {
        assertEquals(
            await loginEndpoint(
                { username: "paul", password: "0a1B2c#4567" },
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
            firstName: "paulus",
            birthdate: "1980-10-11",
            password: "0a1B2c#4567",
            email: "paul@gmail.com",
        });
        assertEquals(res.status, 200);
        assertEquals(typeof (res.body as any).token, "string");
    });

    await t.step("Login user", async () => {
        const res = await loginEndpoint(
            { username: "paul", password: "0a1B2c#4567" },
        );
        assertEquals(res.status, 200);
        assertEquals(typeof (res.body as any).token, "string");
    });
});

Deno.test("Create user validation", async () => {
    assertEquals(
        await createUserEndpoint(null),
        {
            status: 400,
            body: {
                validation: {
                    firstName: [
                        "must be a string",
                        "at least 1 character",
                        "at maximum 256 characters",
                    ],
                    birthdate: [
                        "must be a date in the format YYYY-MM-DD",
                        "must be greater than 1970-01-01",
                    ],
                    email: [
                        "must be a email",
                        "at maximum 256 characters",
                    ],
                    username: [
                        "must be a string",
                        "at least 1 character",
                        "at maximum 32 characters",
                    ],
                    password: [
                        "must be a string",
                        "at least 8 characters",
                        "at maximum 32 characters",
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
        await loginEndpoint(null),
        {
            status: 400,
            body: {
                validation: {
                    username: [
                        "must be a string",
                        "at least 1 character",
                        "at maximum 32 characters",
                    ],
                    password: [
                        "must be a string",
                        "at least 8 characters",
                        "at maximum 32 characters",
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
