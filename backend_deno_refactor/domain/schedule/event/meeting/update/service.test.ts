import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../../lang/result.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { meetingUpdateModelStub } from "./model._stub.ts";
import { meetingUpdate } from "./service.ts";

Deno.test("meetingUpdate", async () => {
    assertEquals(
        await meetingUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            meetingUpdateModelStub,
        ),
        ok(eventStub),
    );
});
