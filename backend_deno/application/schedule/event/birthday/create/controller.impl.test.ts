import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { BirthdayCreateServiceStub } from "@ps/domain/schedule/event/birthday/create/service._stub.ts";
import { created } from "../../../../http/response/created/builder.ts";
import { httpRequestBodyStub } from "../../../../http/request/model._stub.ts";
import { BirthdayCreateControllerImpl } from "./controller.impl.ts";

Deno.test("BirthdayCreateControllerImpl", async () => {
    assertEquals(
        await new BirthdayCreateControllerImpl(
            new BirthdayCreateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
