import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { birthdayUpdate } from "./service.ts";

Deno.test("birthdayUpdate", async () => {
    assertEquals(
        await birthdayUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            birthdayUpdateModelStub,
        ),
        ok(eventStub),
    );
});
