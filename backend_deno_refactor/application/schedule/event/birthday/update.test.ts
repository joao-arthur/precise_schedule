import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { httpRequestFullStub } from "../../../../http/request/model.stub.ts";
import { BirthdayUpdateControllerImpl } from "./controller.ts";

Deno.test("BirthdayUpdateControllerImpl", async () => {
    assertEquals(
        await new BirthdayUpdateControllerImpl().handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
