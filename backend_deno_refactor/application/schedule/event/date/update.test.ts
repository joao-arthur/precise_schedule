import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { httpRequestFullStub } from "../../../../http/request/model.stub.ts";
import { DateUpdateControllerImpl } from "./controller.ts";

Deno.test("DateUpdateControllerImpl", async () => {
    assertEquals(
        await new DateUpdateControllerImpl().handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
