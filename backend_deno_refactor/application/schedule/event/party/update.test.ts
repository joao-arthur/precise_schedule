import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { httpRequestFullStub } from "../../../../http/request/model.stub.ts";
import { PartyUpdateControllerImpl } from "./controller.ts";

Deno.test("PartyUpdateControllerImpl", async () => {
    assertEquals(
        await new PartyUpdateControllerImpl().handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
