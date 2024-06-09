import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { EventRepositoryMemory } from "./memory.adapter.ts";

Deno.test("EventRepositoryMemory", async () => {
    const repository = new EventRepositoryMemory();
    assertEquals(await repository.findByUserAndId(eventStub.user, eventStub.id), undefined);
    await repository.create(eventStub);
    assertEquals(await repository.findByUserAndId(eventStub.user, eventStub.id), eventStub);
    assertEquals(await repository.findByUser(eventStub.user), [eventStub]);
    await repository.update({ ...eventStub, name: "name2" });
    assertEquals(await repository.findByUserAndId(eventStub.user, eventStub.id), {
        ...eventStub,
        name: "name2",
    });
    await repository.del(eventStub.id);
    assertEquals(await repository.findByUserAndId(eventStub.user, eventStub.id), undefined);
});
