import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { PartyUpdateServiceStub } from "@ps/domain/schedule/event/party/update/service._stub.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";
import { httpRequestFullStub } from "../../../../http/request/model._stub.ts";
import { PartyUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("PartyUpdateControllerImpl", async () => {
    assertEquals(
        await new PartyUpdateControllerImpl(
            new PartyUpdateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
