import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { AppointmentUpdateServiceStub } from "./service._stub.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("AppointmentUpdateServiceStub", async () => {
    assertEquals(
        await new AppointmentUpdateServiceStub(eventStub).update(),
        ok(eventStub),
    );
});
