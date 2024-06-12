import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { meetingCreateModelStub } from "./model._stub.ts";
import { MeetingCreateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("MeetingCreateServiceImpl", async () => {
    assertEquals(
        await new MeetingCreateServiceImpl(
            new ValidatorStub(),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, meetingCreateModelStub),
        ok(eventStub),
    );
});
