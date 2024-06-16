import type { UserCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { buildUser } from "./create.ts";
import { ok } from "../../../lang/result.ts";
import { IdGeneratorStub } from "../../../generator/id/service.stub.ts";
import { sessionStub } from "../../../session/model.stub.ts";
import { userCreateModelStub } from "./model.stub.ts";
import { UserCreateRepositoryStub } from "./repo.stub.ts";
import { userCreate } from "./service.ts";

Deno.test("userCreate", async () => {
    assertEquals(
        await userCreate(
            new UserCreateRepositoryStub(),
            new IdGeneratorStub("id"),
            userCreateModelStub,
        ),
        ok(sessionStub),
    );
});

export const userCreateModelStub: UserCreateModel = {
    email: "email",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "username",
    password: "password",
};

Deno.test("UserCreateFactoryImpl", () => {
    assertEquals(
        buildUser(userCreateModelStub, "id"),
        {
            id: "iser-id",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...userCreateModelStub,
        },
    );
});
