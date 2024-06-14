import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { dateUpdateModelStub } from "./model._stub.ts";
import { dateUpdate } from "./service.ts";

Deno.test("dateUpdate", async () => {
    assertEquals(
        await dateUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            dateUpdateModelStub,
        ),
        ok(eventStub),
    );
});
