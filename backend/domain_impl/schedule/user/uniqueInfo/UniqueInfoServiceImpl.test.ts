import type { User } from "@ps/domain/schedule/user/User.ts";

import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { UniqueInfoRepositoryMock } from "@ps/domain_mock/schedule/user/uniqueInfo/UniqueInfoRepositoryMock.ts";
import { uniqueInfoModelMock } from "@ps/domain_mock/schedule/user/uniqueInfo/UniqueInfoModelMock.ts";
import { UsernameAlreadyRegistered } from "@ps/domain/schedule/user/uniqueInfo/UsernameAlreadyRegistered.ts";
import { EmailAlreadyRegistered } from "@ps/domain/schedule/user/uniqueInfo/EmailAlreadyRegistered.ts";
import { UniqueInfoServiceImpl } from "./UniqueInfoServiceImpl.ts";

const equals: User = {
    ...userMock,
    ...uniqueInfoModelMock,
};

const unique: User = {
    ...userMock,
    username: "a1b2c3d4e5f6",
    email: "a1b2c3d4e5f6@gmail.com",
};

Deno.test("UniqueInfoServiceImpl.validateNew", async () => {
    assertEquals(
        await new UniqueInfoServiceImpl(
            new UniqueInfoRepositoryMock(0, 0),
        ).validateNew(
            uniqueInfoModelMock,
        ),
        undefined,
    );
    await assertRejects(
        () =>
            new UniqueInfoServiceImpl(
                new UniqueInfoRepositoryMock(1, 0),
            ).validateNew(
                uniqueInfoModelMock,
            ),
        UsernameAlreadyRegistered,
    );
    await assertRejects(
        () =>
            new UniqueInfoServiceImpl(
                new UniqueInfoRepositoryMock(0, 1),
            ).validateNew(
                uniqueInfoModelMock,
            ),
        EmailAlreadyRegistered,
    );
});

Deno.test("validateUniqueEmail.validateExisting", async () => {
    assertEquals(
        await new UniqueInfoServiceImpl(
            new UniqueInfoRepositoryMock(0, 0),
        ).validateExisting(
            uniqueInfoModelMock,
            unique,
        ),
        undefined,
    );
    await assertRejects(
        () =>
            new UniqueInfoServiceImpl(
                new UniqueInfoRepositoryMock(1, 0),
            )
                .validateExisting(
                    uniqueInfoModelMock,
                    unique,
                ),
        UsernameAlreadyRegistered,
    );
    await assertRejects(
        () =>
            new UniqueInfoServiceImpl(
                new UniqueInfoRepositoryMock(0, 1),
            )
                .validateExisting(
                    uniqueInfoModelMock,
                    unique,
                ),
        EmailAlreadyRegistered,
    );
});

Deno.test("validateUniqueEmail.validateExisting", async () => {
    assertEquals(
        await new UniqueInfoServiceImpl(
            new UniqueInfoRepositoryMock(0, 0),
        ).validateExisting(
            uniqueInfoModelMock,
            equals,
        ),
        undefined,
    );
    assertEquals(
        await new UniqueInfoServiceImpl(
            new UniqueInfoRepositoryMock(1, 0),
        ).validateExisting(
            uniqueInfoModelMock,
            equals,
        ),
        undefined,
    );
    assertEquals(
        await new UniqueInfoServiceImpl(
            new UniqueInfoRepositoryMock(0, 1),
        ).validateExisting(
            uniqueInfoModelMock,
            equals,
        ),
        undefined,
    );
});
