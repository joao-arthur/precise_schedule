import { assertEquals } from "std/assert/assert_equals.ts";
import { userStub } from "@ps/domain/schedule/user/model._stub.ts";
import { UserRepositoryMemory } from "./memory.adapter.ts";

Deno.test("UserRepositoryMemory", async () => {
    const repository = new UserRepositoryMemory();
    assertEquals(await repository.findById(userStub.id), undefined);
    assertEquals(
        await repository.findByCredentials(
            userStub.username,
            userStub.password,
        ),
        undefined,
    );
    await repository.create(userStub);
    assertEquals(await repository.findById(userStub.id), userStub);
    assertEquals(
        await repository.findByCredentials(
            userStub.username,
            userStub.password,
        ),
        userStub,
    );
    assertEquals(
        await repository.findByCredentials("username2", "password2"),
        undefined,
    );
    assertEquals(await repository.countUsername("username2"), 0);
    assertEquals(await repository.countEmail("email2"), 0);
    await repository.update({
        ...userStub,
        username: "username2",
        email: "email2",
    });
    assertEquals(
        await repository.findByCredentials("username2", userStub.password),
        { ...userStub, username: "username2", email: "email2" },
    );
    assertEquals(await repository.countUsername("username2"), 1);
    assertEquals(await repository.countEmail("email2"), 1);
});
