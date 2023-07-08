import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelMock } from "../create/CreateEventModelMock.ts";
import { CreateBirthdayEventFactoryMock } from "./CreateBirthdayEventFactoryMock.ts";

Deno.test("CreateBirthdayEventFactoryMock", () => {
    assertEquals(
        new CreateBirthdayEventFactoryMock(
            createEventModelMock,
        ).build(),
        createEventModelMock,
    );
});
