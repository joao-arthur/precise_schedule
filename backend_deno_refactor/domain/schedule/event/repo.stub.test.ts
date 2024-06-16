import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { eventRepoStubBuild } from "./repo.stub.ts";

Deno.test("eventRepoStubBuild", async () => {
    const repo = eventRepoStubBuild();
    assertEquals(await repo.cCreate(), ok(undefined));
    assertEquals(await repo.cUpdate(), ok(undefined));
    assertEquals(await repo.cDelete(), ok(undefined));

    assertEquals(
        await repo.cReadByUser(""),
        ok(eventStub),
    );
    assertEquals(
        await repo.cReadByUserAndEventId("", ""),
        ok(eventStub),
    );
});
