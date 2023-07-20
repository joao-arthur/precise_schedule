import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { EventRepositoryMemory } from "./EventRepositoryMemory.ts";

Deno.test("EventRepositoryMemory", async () => {
    const repository = new EventRepositoryMemory();
    assertEquals(await repository.findByUserAndId(eventMock.user, eventMock.id), undefined);
    await repository.create(eventMock);
    assertEquals(await repository.findByUserAndId(eventMock.user, eventMock.id), eventMock);
    assertEquals(await repository.findByUser(eventMock.user), [eventMock]);
    await repository.update({ ...eventMock, name: "name2" });
    assertEquals(await repository.findByUserAndId(eventMock.user, eventMock.id), {
        ...eventMock,
        name: "name2",
    });
    await repository.del(eventMock.id);
    assertEquals(await repository.findByUserAndId(eventMock.user, eventMock.id), undefined);
});
