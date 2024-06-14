import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { meetingCreateModelStub } from "./model._stub.ts";
import { meetingCreate } from "./service.ts";

Deno.test("meetingCreate", async () => {
    assertEquals(
        await meetingCreate(
            new ValidatorStub(),
            eventStub.user,
            meetingCreateModelStub,
        ),
        ok(eventStub),
    );
});
