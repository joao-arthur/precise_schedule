import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../domain/lang/result.ts";
import { userStub } from "../../domain/schedule/user/model.stub.ts";
import { userRepoMemory } from "./userRepoMemory.ts";

Deno.test("userRepoMemory", async () => {
    const repo = userRepoMemory();
    assertEquals(await repo.cReadById(userStub.id), ok(undefined));
    assertEquals(
        await repo.cReadByCredentials(userStub.username, userStub.password),
        ok(undefined),
    );
    await repo.cCreate(userStub);
    assertEquals(await repo.cReadById(userStub.id), ok(userStub));
    assertEquals(await repo.cReadByCredentials(userStub.username, userStub.password), ok(userStub));
    assertEquals(await repo.cReadByCredentials("username2", "password2"), ok(undefined));
    assertEquals(await repo.cCountUsername("username2"), ok(0));
    assertEquals(await repo.cCountEmail("email2"), ok(0));
    await repo.cUpdate({ ...userStub, username: "username2", email: "email2" });
    assertEquals(
        await repo.cReadByCredentials("username2", "abcDEF123$%"),
        ok({ ...userStub, username: "username2", email: "email2" }),
    );
    assertEquals(await repo.cCountUsername("username2"), ok(1));
    assertEquals(await repo.cCountEmail("email2"), ok(1));
});
