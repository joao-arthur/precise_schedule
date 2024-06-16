import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { EventCreateRepositoryStub } from "./repo._stub.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteRepositoryStub } from "./repo._stub.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { EventUpdateRepositoryStub } from "./repo._stub.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model._stub.ts";
import { eventRepoStubBuild } from "./repo._stub.ts";

Deno.test("eventRepoStubBuild", async () => {
    const repo = eventRepoStubBuild();
    assertEquals(await repo.cCreate);

    assertEquals(
        await new EventFindRepositoryStub(undefined).readByUserAndId(),
        ok(undefined),
    );
    assertEquals(
        await new EventFindRepositoryStub(eventStub).readByUserAndId(),
        ok(eventStub),
    );
});

Deno.test("EventUpdateRepositoryStub", async () => {
    assertEquals(
        await new EventUpdateRepositoryStub().update(),
        ok(undefined),
    );
});

Deno.test("EventDeleteRepositoryStub", async () => {
    assertEquals(await new EventDeleteRepositoryStub().del(), ok(undefined));
});

Deno.test("EventCreateRepositoryStub", async () => {
    assertEquals(await new EventCreateRepositoryStub().create(), ok(undefined));
});
