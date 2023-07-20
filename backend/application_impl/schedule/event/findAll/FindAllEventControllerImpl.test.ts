import { assertEquals } from "std/testing/asserts.ts";
import { FindAllEventControllerImpl } from "./FindAllEventControllerImpl.ts";
import { FindEventServiceMock } from "@ps/domain_mock/schedule/event/find/FindEventServiceMock.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

Deno.test("FindAllEventControllerImpl", async () => {
    assertEquals(
        await new FindAllEventControllerImpl(
            new FindEventServiceMock(eventMock),
        ).handle(eventMock.user),
        ok([eventMock] as any),
    );
});
