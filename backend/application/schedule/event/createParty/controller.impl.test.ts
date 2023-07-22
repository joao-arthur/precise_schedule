import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { PartyCreateServiceStub } from "@ps/domain/schedule/event/party/create/service._stub.ts";
import { created } from "../../../http/response/created/builder.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { PartyCreateControllerImpl } from "./controller.impl.ts";

Deno.test("PartyCreateControllerImpl", async () => {
    assertEquals(
        await new PartyCreateControllerImpl(
            new PartyCreateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
