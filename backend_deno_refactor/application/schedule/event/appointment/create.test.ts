import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../domain/schedule/event/model.stub.ts";
import { created } from "../../../http/response.ts";
import { httpRequestBodyStub } from "../../http/request/model.stub.ts";
import { appointmentCreateController } from "./controller.ts";

Deno.test("appointmentCreateController", async () => {
    assertEquals(
        await appointmentCreateController(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
