import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { BirthdayUpdateServiceStub } from "@ps/domain/schedule/event/birthday/update/service._stub.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";
import { httpRequestFullStub } from "../../../../http/request/model._stub.ts";
import { BirthdayUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("BirthdayUpdateControllerImpl", async () => {
    assertEquals(
        await new BirthdayUpdateControllerImpl(
            new BirthdayUpdateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
