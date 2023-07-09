import { describe, expect, it } from "vitest";
import { handleResponse } from "./handleResponse";

describe("handleResponse", () => {
    it("200", async () => {
        const obj = { name: "Paul" };
        await expect(
            handleResponse(new Response(JSON.stringify(obj), { status: 200 })),
        ).resolves.toEqual(obj);
    });

    it("201", async () => {
        await expect(
            handleResponse(new Response(undefined, { status: 201 })),
        ).resolves.toBe(undefined);
    });

    it("204", async () => {
        await expect(
            handleResponse(new Response(undefined, { status: 204 })),
        ).resolves.toBe(undefined);
    });

    it("400", async () => {
        const obj = { name: "Ringo" };
        await expect(
            handleResponse(new Response(JSON.stringify(obj), { status: 400 })),
        ).rejects.toEqual(obj);
    });

    it("401", async () => {
        const response = new Response(undefined, { status: 401 });
        await expect(
            handleResponse(response),
        ).rejects.toEqual(response);
    });

    it("500", async () => {
        const obj = { name: "John" };
        await expect(
            handleResponse(new Response(JSON.stringify(obj), { status: 500 })),
        ).rejects.toEqual(obj);
    });
});
