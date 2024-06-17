import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { created } from "../../../http/response.ts";
import { httpRequestBodyStub } from "../../../../http/request/model.stub.ts";
import { BirthdayCreateControllerImpl } from "./controller.ts";

Deno.test("BirthdayCreateControllerImpl", async () => {
    assertEquals(
        await new BirthdayCreateControllerImpl().handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
