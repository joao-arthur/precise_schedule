import { assertEquals } from "@std/assert/assert-equals";
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
