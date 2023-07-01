import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { UserRepositoryMemory } from "./UserRepositoryMemory.ts";

Deno.test("UserRepositoryMemory", () => {
    const repository = new UserRepositoryMemory();
    assertEquals(repository.findById(userMock.id), undefined);
    assertEquals(
        repository.findByCredentials(
            userMock.username,
            userMock.email,
        ),
        undefined,
    );
    repository.create(userMock);
    assertEquals(repository.findById(userMock.id), userMock);
    assertEquals(
        repository.findByCredentials(
            userMock.username,
            userMock.email,
        ),
        userMock,
    );
    assertEquals(
        repository.findByCredentials("username2", "email2"),
        undefined,
    );
    assertEquals(repository.countUsername("username2"), 0);
    assertEquals(repository.countEmail("email2"), 0);
    repository.update({
        ...userMock,
        username: "username2",
        email: "email2",
    });
    assertEquals(
        repository.findByCredentials("username2", "email2"),
        { ...userMock, username: "username2", email: "email2" },
    );
    assertEquals(repository.countUsername("username2"), 1);
    assertEquals(repository.countEmail("email2"), 1);
});
