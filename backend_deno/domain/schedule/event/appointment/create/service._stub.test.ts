import { assertEquals } from "std/assert/assert_equals.ts";
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
