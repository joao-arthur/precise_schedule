import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { birthdayCreateModelStub } from "./model._stub.ts";
import { BirthdayCreateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("BirthdayCreateServiceImpl", async () => {
    assertEquals(
        await new BirthdayCreateServiceImpl(
            new ValidatorStub(),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, birthdayCreateModelStub),
        ok(eventStub),
    );
});