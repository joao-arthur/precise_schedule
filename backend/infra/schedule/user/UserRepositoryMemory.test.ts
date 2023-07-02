import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { UserRepositoryMemory } from "./UserRepositoryMemory.ts";

Deno.test("UserRepositoryMemory", async () => {
    const repository = new UserRepositoryMemory();
    assertEquals(await repository.findById(userMock.id), undefined);
    assertEquals(
        await repository.findByCredentials(
            userMock.username,
            userMock.email,
        ),
        undefined,
    );
    await repository.create(userMock);
    assertEquals(await repository.findById(userMock.id), userMock);
    assertEquals(
        await repository.findByCredentials(
            userMock.username,
            userMock.email,
        ),
        userMock,
    );
    assertEquals(
        await repository.findByCredentials("username2", "email2"),
        undefined,
    );
    assertEquals(await repository.countUsername("username2"), 0);
    assertEquals(await repository.countEmail("email2"), 0);
    await repository.update({
        ...userMock,
        username: "username2",
        email: "email2",
    });
    assertEquals(
        await repository.findByCredentials("username2", "email2"),
        { ...userMock, username: "username2", email: "email2" },
    );
    assertEquals(await repository.countUsername("username2"), 1);
    assertEquals(await repository.countEmail("email2"), 1);
});
