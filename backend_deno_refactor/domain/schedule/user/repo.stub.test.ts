import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import { RepoErr } from "../../repo.ts";
import { userStub } from "./model.stub.ts";
import {
    userRepoCountStubBuild,
    userRepoEmptyStubBuild,
    userRepoErrStubBuild,
    userRepoUserStubBuild,
} from "./repo.stub.ts";

Deno.test("userRepoUserStubBuild", async () => {
    const repo = userRepoUserStubBuild();
    assertEquals(await repo.cCreate(userStub), ok(undefined));
    assertEquals(await repo.cUpdate(userStub), ok(undefined));
    assertEquals(await repo.cReadById("user-id"), ok(userStub));
    assertEquals(await repo.cReadByCredentials("username", "password"), ok(userStub));
    assertEquals(await repo.cCountUsername("username"), ok(0));
    assertEquals(await repo.cCountEmail("user@gmail.com"), ok(0));
});

Deno.test("userRepoCountStubBuild", async () => {
    const repo = userRepoCountStubBuild(1, 2);
    assertEquals(await repo.cCreate(userStub), ok(undefined));
    assertEquals(await repo.cUpdate(userStub), ok(undefined));
    assertEquals(await repo.cReadById("user-id"), ok(undefined));
    assertEquals(await repo.cReadByCredentials("username", "password"), ok(undefined));
    assertEquals(await repo.cCountUsername("username"), ok(1));
    assertEquals(await repo.cCountEmail("user@gmail.com"), ok(2));
});

Deno.test("userRepoEmptyStubBuild", async () => {
    const repo = userRepoEmptyStubBuild();
    assertEquals(await repo.cCreate(userStub), ok(undefined));
    assertEquals(await repo.cUpdate(userStub), ok(undefined));
    assertEquals(await repo.cReadById("user-id"), ok(undefined));
    assertEquals(await repo.cReadByCredentials("username", "password"), ok(undefined));
    assertEquals(await repo.cCountUsername("username"), ok(0));
    assertEquals(await repo.cCountEmail("user@gmail.com"), ok(0));
});

Deno.test("userRepoErrStubBuild", async () => {
    const repo = userRepoErrStubBuild();
    assertEquals(await repo.cCreate(userStub), err(new RepoErr()));
    assertEquals(await repo.cUpdate(userStub), err(new RepoErr()));
    assertEquals(await repo.cReadById("user-id"), err(new RepoErr()));
    assertEquals(await repo.cReadByCredentials("username", "password"), err(new RepoErr()));
    assertEquals(await repo.cCountUsername("username"), err(new RepoErr()));
    assertEquals(await repo.cCountEmail("user@gmail.com"), err(new RepoErr()));
});
