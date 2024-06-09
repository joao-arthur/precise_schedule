import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "../../model._stub.ts";
import { AppointmentUpdateServiceStub } from "./service._stub.ts";

Deno.test("AppointmentUpdateServiceStub", async () => {
    assertEquals(
        await new AppointmentUpdateServiceStub(
            eventStub,
        ).update(),
        eventStub,
    );
});
