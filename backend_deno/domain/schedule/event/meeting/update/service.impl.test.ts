import { assertEquals } from "std/assert/assert_equals.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { meetingUpdateModelStub } from "./model._stub.ts";
import { MeetingUpdateFactoryStub } from "./factory._stub.ts";
import { MeetingUpdateServiceImpl } from "./service.impl.ts";

Deno.test("MeetingUpdateServiceImpl", async () => {
    assertEquals(
        await new MeetingUpdateServiceImpl(
            new ValidatorStub(),
            new MeetingUpdateFactoryStub(eventStub),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, meetingUpdateModelStub),
        eventStub,
    );
});
