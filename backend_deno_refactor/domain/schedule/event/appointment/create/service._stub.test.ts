import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "../../model._stub.ts";
import { AppointmentCreateServiceStub } from "./service._stub.ts";

Deno.test("AppointmentCreateServiceStub", async () => {
    assertEquals(
        await new AppointmentCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
