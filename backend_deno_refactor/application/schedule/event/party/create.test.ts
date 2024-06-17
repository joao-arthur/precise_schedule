import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { created } from "../../../http/response.ts";
import { httpRequestBodyStub } from "../../../../http/request/model.stub.ts";
import { PartyCreateControllerImpl } from "./controller.ts";

Deno.test("PartyCreateControllerImpl", async () => {
    assertEquals(
        await new PartyCreateControllerImpl().handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
