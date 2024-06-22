import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../lang/result.ts";
import { userRepoCountStubBuild } from "./repo.stub.ts";
import { userStub, userUniqueDifferentStub, userUniqueEqualsStub } from "./model.stub.ts";
import {
    EmailAlreadyRegistered,
    userExistingValidateUnique,
    UsernameAlreadyRegistered,
    userNewValidateUnique,
} from "./uniqueInfo.ts";

Deno.test("userNewValidateUnique", async () => {
    assertEquals(
        await userNewValidateUnique(userRepoCountStubBuild(0, 0), userUniqueEqualsStub),
        ok(undefined),
    );
    assertEquals(
        await userNewValidateUnique(userRepoCountStubBuild(1, 0), userUniqueEqualsStub),
        err(new UsernameAlreadyRegistered()),
    );
    assertEquals(
        await userNewValidateUnique(userRepoCountStubBuild(0, 1), userUniqueEqualsStub),
        err(new EmailAlreadyRegistered()),
    );
    assertEquals(
        await userNewValidateUnique(userRepoCountStubBuild(1, 1), userUniqueEqualsStub),
        err(new UsernameAlreadyRegistered()),
    );
});

Deno.test("userExistingValidateUnique", async () => {
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(0, 0),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(1, 0),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(0, 1),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(1, 1),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(2, 0),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(0, 2),
            userUniqueEqualsStub,
            userStub,
        ),
        ok(undefined),
    );
});

Deno.test("userExistingValidateUnique", async () => {
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(0, 0),
            userUniqueDifferentStub,
            userStub,
        ),
        ok(undefined),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(1, 0),
            userUniqueDifferentStub,
            userStub,
        ),
        err(new UsernameAlreadyRegistered()),
    );
    assertEquals(
        await userExistingValidateUnique(
            userRepoCountStubBuild(0, 1),
            userUniqueDifferentStub,
            userStub,
        ),
        err(new EmailAlreadyRegistered()),
    );
});
