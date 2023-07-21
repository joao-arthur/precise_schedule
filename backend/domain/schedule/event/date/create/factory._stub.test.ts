import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelMock } from "../create/CreateEventModelMock.ts";
import { CreateDateEventFactoryMock } from "./CreateDateEventFactoryMock.ts";

Deno.test("CreateDateEventFactoryMock", () => {
    assertEquals(
        new CreateDateEventFactoryMock(
            createEventModelMock,
        ).build(),
        createEventModelMock,
    );
});
