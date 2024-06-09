import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { dateCreateModelStub } from "./model._stub.ts";
import { DateCreateFactoryStub } from "./factory._stub.ts";
import { DateCreateServiceImpl } from "./service.impl.ts";

Deno.test("DateCreateServiceImpl", async () => {
    assertEquals(
        await new DateCreateServiceImpl(
            new ValidatorStub(),
            new DateCreateFactoryStub(eventStub),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, dateCreateModelStub),
        eventStub,
    );
});
