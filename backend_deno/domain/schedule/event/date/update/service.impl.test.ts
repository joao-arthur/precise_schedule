import { assertEquals } from "std/assert/assert_equals.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { dateUpdateModelStub } from "./model._stub.ts";
import { DateUpdateFactoryStub } from "./factory._stub.ts";
import { DateUpdateServiceImpl } from "./service.impl.ts";

Deno.test("DateUpdateServiceImpl", async () => {
    assertEquals(
        await new DateUpdateServiceImpl(
            new ValidatorStub(),
            new DateUpdateFactoryStub(eventStub),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, dateUpdateModelStub),
        eventStub,
    );
});
