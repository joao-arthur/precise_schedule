import { assertEquals } from "@std/assert/assert-equals";
import { buildOk } from "../../../../lang/result.ts";
import { eventStub } from "../../model._stub.ts";
import { AppointmentCreateServiceStub } from "./service._stub.ts";

Deno.test("AppointmentCreateServiceStub", async () => {
    assertEquals(
        await new AppointmentCreateServiceStub(eventStub).create(),
        buildOk(eventStub),
    );
});
