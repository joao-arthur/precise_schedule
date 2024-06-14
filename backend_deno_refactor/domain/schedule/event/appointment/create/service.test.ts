import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { appointmentCreateModelStub } from "./model._stub.ts";
import { appointmentCreate } from "./service.ts";

Deno.test("appointmentCreate", async () => {
    assertEquals(
        await appointmentCreate(
            new ValidatorStub(),
            eventStub.user,
            appointmentCreateModelStub,
        ),
        ok(eventStub),
    );
});
