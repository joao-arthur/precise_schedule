import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { EventRepositoryMemory } from "./EventRepositoryMemory.ts";

Deno.test("EventRepositoryMemory", async () => {
    const repository = new EventRepositoryMemory();
    assertEquals(await repository.findById(eventMock.id), undefined);
    await repository.create(eventMock);
    assertEquals(await repository.findById(eventMock.id), eventMock);
    await repository.update({ ...eventMock, name: "name2" });
    assertEquals(await repository.findById(eventMock.id), {
        ...eventMock,
        name: "name2",
    });
    await repository.del(eventMock.id);
    assertEquals(await repository.findById(eventMock.id), undefined);
});
