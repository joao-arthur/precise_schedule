import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { created } from "../../../http/response.ts";
import { httpRequestBodyStub } from "../../../../http/request/model.stub.ts";
import { DateCreateControllerImpl } from "./controller.ts";

Deno.test("DateCreateControllerImpl", async () => {
    assertEquals(
        await new DateCreateControllerImpl().handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
