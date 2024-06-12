import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { birthdayUpdateModelStub } from "./model._stub.ts";
import { BirthdayUpdateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("BirthdayUpdateServiceImpl", async () => {
    assertEquals(
        await new BirthdayUpdateServiceImpl(
            new ValidatorStub(),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, birthdayUpdateModelStub),
        ok(eventStub),
    );
});
