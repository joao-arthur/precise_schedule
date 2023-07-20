import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { DeleteEventRepositoryMock } from "@ps/domain_mock/schedule/event/delete/DeleteEventRepositoryMock.ts";
import { FindEventServiceMock } from "@ps/domain_mock/schedule/event/find/FindEventServiceMock.ts";
import { DeleteEventServiceImpl } from "./DeleteEventServiceImpl.ts";

Deno.test("DeleteEventServiceImpl", async () => {
    assertEquals(
        await new DeleteEventServiceImpl(
            new DeleteEventRepositoryMock(),
            new FindEventServiceMock(eventMock),
        ).del(eventMock.user, eventMock.id),
        eventMock,
    );
});
