import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { BirthdayUpdateFactoryStub } from "./factory._stub.ts";
import { BirthdayUpdateServiceImpl } from "./service.impl.ts";

Deno.test("BirthdayUpdateServiceImpl", async () => {
    assertEquals(
        await new BirthdayUpdateServiceImpl(
            new ValidatorStub(),
            new BirthdayUpdateFactoryStub(eventStub),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, birthdayUpdateModelStub),
        eventStub,
    );
});
