import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "@ps/domain_mock/schedule/event/update/UpdateEventModelMock.ts";
import { UpdateEventFactoryImpl } from "./UpdateEventFactoryImpl.ts";

Deno.test("UpdateEventFactoryImpl", () => {
    assertEquals(
        new UpdateEventFactoryImpl().build(
            updateEventModelMock,
            "id",
        ),
        { id: "id", ...updateEventModelMock },
    );
});
