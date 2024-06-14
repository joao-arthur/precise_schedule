import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { dateCreateModelStub } from "./model._stub.ts";
import { dateCreate } from "./service.ts";

Deno.test("dateCreate", async () => {
    assertEquals(
        await dateCreate(
            new ValidatorStub(),
            eventStub.user,
            dateCreateModelStub,
        ),
        ok(eventStub),
    );
});
