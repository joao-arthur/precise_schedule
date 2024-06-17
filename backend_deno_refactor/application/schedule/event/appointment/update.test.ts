import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { httpRequestFullStub } from "../../../../http/request/model.stub.ts";
import { AppointmentUpdateControllerImpl } from "./controller.ts";

Deno.test("AppointmentUpdateControllerImpl", async () => {
    assertEquals(
        await new AppointmentUpdateControllerImpl().handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
