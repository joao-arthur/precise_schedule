import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { EventRepositoryMemory } from "./EventRepositoryMemory.ts";

Deno.test("EventRepositoryMemory", () => {
    const repository = new EventRepositoryMemory();
    assertEquals(repository.findById(eventMock.id), undefined);
    repository.create(eventMock);
    assertEquals(repository.findById(eventMock.id), eventMock);
    repository.update({ ...eventMock, name: "name2" });
    assertEquals(repository.findById(eventMock.id), {
        ...eventMock,
        name: "name2",
    });
    repository.del(eventMock.id);
    assertEquals(repository.findById(eventMock.id), undefined);
});
