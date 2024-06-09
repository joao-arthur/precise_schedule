import type { User } from "../model.ts";
import { assertEquals } from "std/assert/assert_equals.ts";
import { assertRejects } from "std/assert/assert_rejects.ts";
import { userStub } from "../model._stub.ts";
import { UserUniqueInfoRepositoryStub } from "./repository._stub.ts";
import { uniqueInfoModelStub } from "./model._stub.ts";
import { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";
import { UserUniqueInfoServiceImpl } from "./service.impl.ts";

const equals: User = {
    ...userStub,
    ...uniqueInfoModelStub,
};

const unique: User = {
    ...userStub,
    username: "a1b2c3d4e5f6",
    email: "a1b2c3d4e5f6@gmail.com",
};

Deno.test("UserUniqueInfoServiceImpl.validateNew", async () => {
    assertEquals(
        await new UserUniqueInfoServiceImpl(
            new UserUniqueInfoRepositoryStub(0, 0),
        ).validateNew(
            uniqueInfoModelStub,
        ),
        undefined,
    );
    await assertRejects(
        () =>
            new UserUniqueInfoServiceImpl(
                new UserUniqueInfoRepositoryStub(1, 0),
            ).validateNew(
                uniqueInfoModelStub,
            ),
        UsernameAlreadyRegistered,
    );
    await assertRejects(
        () =>
            new UserUniqueInfoServiceImpl(
                new UserUniqueInfoRepositoryStub(0, 1),
            ).validateNew(
                uniqueInfoModelStub,
            ),
        EmailAlreadyRegistered,
    );
});

Deno.test("validateUniqueEmail.validateExisting", async () => {
    assertEquals(
        await new UserUniqueInfoServiceImpl(
            new UserUniqueInfoRepositoryStub(0, 0),
        ).validateExisting(
            uniqueInfoModelStub,
            unique,
        ),
        undefined,
    );
    await assertRejects(
        () =>
            new UserUniqueInfoServiceImpl(
                new UserUniqueInfoRepositoryStub(1, 0),
            )
                .validateExisting(
                    uniqueInfoModelStub,
                    unique,
                ),
        UsernameAlreadyRegistered,
    );
    await assertRejects(
        () =>
            new UserUniqueInfoServiceImpl(
                new UserUniqueInfoRepositoryStub(0, 1),
            )
                .validateExisting(
                    uniqueInfoModelStub,
                    unique,
                ),
        EmailAlreadyRegistered,
    );
});

Deno.test("validateUniqueEmail.validateExisting", async () => {
    assertEquals(
        await new UserUniqueInfoServiceImpl(
            new UserUniqueInfoRepositoryStub(0, 0),
        ).validateExisting(
            uniqueInfoModelStub,
            equals,
        ),
        undefined,
    );
    assertEquals(
        await new UserUniqueInfoServiceImpl(
            new UserUniqueInfoRepositoryStub(1, 0),
        ).validateExisting(
            uniqueInfoModelStub,
            equals,
        ),
        undefined,
    );
    assertEquals(
        await new UserUniqueInfoServiceImpl(
            new UserUniqueInfoRepositoryStub(0, 1),
        ).validateExisting(
            uniqueInfoModelStub,
            equals,
        ),
        undefined,
    );
});
