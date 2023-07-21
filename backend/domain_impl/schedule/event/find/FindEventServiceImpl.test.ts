import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { FindEventRepositoryMock } from "@ps/domain_mock/schedule/event/find/FindEventRepositoryMock.ts";
import { EventNotFound } from "@ps/domain/schedule/event/find/EventNotFound.ts";
import { FindEventServiceImpl } from "./FindEventServiceImpl.ts";

Deno.test("FindEventServiceImpl.findByUser", async () => {
    assertEquals(
        await new FindEventServiceImpl(
            new FindEventRepositoryMock(undefined),
        ).findByUser(eventMock.user),
        [],
    );
    assertEquals(
        await new FindEventServiceImpl(
            new FindEventRepositoryMock(eventMock),
        ).findByUser(eventMock.user),
        [eventMock],
    );
});

Deno.test("FindEventServiceImpl.findByUserAndId", async () => {
    await assertRejects(
        () =>
            new FindEventServiceImpl(
                new FindEventRepositoryMock(undefined),
            ).findByUserAndId(eventMock.user, eventMock.id),
        EventNotFound,
    );
    assertEquals(
        await new FindEventServiceImpl(
            new FindEventRepositoryMock(eventMock),
        ).findByUserAndId(eventMock.user, eventMock.id),
        eventMock,
    );
});
