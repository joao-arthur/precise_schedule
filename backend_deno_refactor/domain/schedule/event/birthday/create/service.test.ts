import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { birthdayCreateModelStub } from "./model._stub.ts";
import { birthdayCreate } from "./service.ts";

Deno.test("birthdayCreate", async () => {
    assertEquals(
        await birthdayCreate(
            new ValidatorStub(),
            eventStub.user,
            birthdayCreateModelStub,
        ),
        ok(eventStub),
    );
});
