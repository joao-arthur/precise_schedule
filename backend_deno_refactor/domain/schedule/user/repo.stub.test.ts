import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import { RepoError } from "../../repository/repo.ts";
import { userStub } from "./model.stub.ts";
import { userRepoEmptyStubBuild, userRepoErrStubBuild, userRepoStubBuild } from "./repo.stub.ts";

Deno.test("userRepoStubBuild", async () => {
    const repo = userRepoStubBuild(userStub, 1, 2);
    assertEquals(await repo.cCreate(userStub), ok(undefined));
    assertEquals(await repo.cUpdate(userStub), ok(undefined));
    assertEquals(await repo.cReadById("user-id"), ok(userStub));
    assertEquals(await repo.cReadByCredentials("username", "password"), ok(userStub));
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
    assertEquals(await repo.cCreate(userStub), err(new RepoError()));
    assertEquals(await repo.cUpdate(userStub), err(new RepoError()));
    assertEquals(await repo.cReadById("user-id"), err(new RepoError()));
    assertEquals(await repo.cReadByCredentials("username", "password"), err(new RepoError()));
    assertEquals(await repo.cCountUsername("username"), err(new RepoError()));
    assertEquals(await repo.cCountEmail("user@gmail.com"), err(new RepoError()));
});
