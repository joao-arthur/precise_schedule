import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { appointmentUpdateModelStub } from "./model._stub.ts";
import { appointmentUpdate } from "./service.ts";

Deno.test("appointmentUpdate", async () => {
    assertEquals(
        await appointmentUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            appointmentUpdateModelStub,
        ),
        ok(eventStub),
    );
});
