import type { User } from "../model.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../../lang/result.ts";
import { userStub } from "../model._stub.ts";
import { UserUniqueInfoRepositoryStub } from "./repo._stub.ts";
import { uniqueInfoModelStub } from "./model._stub.ts";
import { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";
import { userUniqueInfoValidateExisting, userUniqueInfoValidateNew } from "./service.ts";

const equals: User = {
    ...userStub,
    ...uniqueInfoModelStub,
};

const unique: User = {
    ...userStub,
    username: "a1b2c3d4e5f6",
    email: "a1b2c3d4e5f6@gmail.com",
};

Deno.test("userUniqueInfoValidateNew", async () => {
    assertEquals(
        await userUniqueInfoValidateNew(
            new UserUniqueInfoRepositoryStub(0, 0),
            uniqueInfoModelStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userUniqueInfoValidateNew(
            new UserUniqueInfoRepositoryStub(1, 0),
            uniqueInfoModelStub,
        ),
        err(new UsernameAlreadyRegistered()),
    );
    assertEquals(
        await userUniqueInfoValidateNew(
            new UserUniqueInfoRepositoryStub(0, 1),
            uniqueInfoModelStub,
        ),
        err(new EmailAlreadyRegistered()),
    );
});

Deno.test("userUniqueInfoValidateExisting", async () => {
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(0, 0),
            uniqueInfoModelStub,
            unique,
        ),
        ok(undefined),
    );
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(1, 0),
            uniqueInfoModelStub,
            unique,
        ),
        err(new UsernameAlreadyRegistered()),
    );
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(0, 1),
            uniqueInfoModelStub,
            unique,
        ),
        err(new EmailAlreadyRegistered()),
    );
});

Deno.test("validateUniqueEmail.validateExisting", async () => {
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(0, 0),
            uniqueInfoModelStub,
            equals,
        ),
        ok(undefined),
    );
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(1, 0),
            uniqueInfoModelStub,
            equals,
        ),
        ok(undefined),
    );
    assertEquals(
        await userUniqueInfoValidateExisting(
            new UserUniqueInfoRepositoryStub(0, 1),
            uniqueInfoModelStub,
            equals,
        ),
        ok(undefined),
    );
});
