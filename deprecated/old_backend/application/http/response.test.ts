import { assertEquals } from "@std/assert/assert-equals";
import {
    badRequest,
    created,
    internalServerError,
    noContent,
    ok,
    unauthorized,
} from "./response.ts";

Deno.test("badRequest", () => {
    assertEquals(
        badRequest({ error: 1 }),
        {
            status: 400,
            body: { error: 1 },
            headers: undefined,
        },
    );
});

Deno.test("created", () => {
    assertEquals(
        created({ id: "THE MOST MYSTERIOUS SONG" }),
        {
            status: 201,
            body: undefined,
            headers: { contentLocation: "THE MOST MYSTERIOUS SONG" },
        },
    );
});

Deno.test("internalServerError", () => {
    assertEquals(internalServerError(), {
        status: 500,
        body: { message: "An unexpected error occurred!" },
        headers: undefined,
    });
});

Deno.test("noContent", () => {
    assertEquals(
        noContent(),
        {
            status: 204,
            body: undefined,
            headers: undefined,
        },
    );
});

Deno.test("ok", () => {
    assertEquals(
        ok({ id: 1 }),
        {
            status: 200,
            body: { id: 1 },
            headers: undefined,
        },
    );
});

Deno.test("unauthorized", () => {
    assertEquals(
        unauthorized(),
        {
            status: 401,
            body: undefined,
            headers: undefined,
        },
    );
});
