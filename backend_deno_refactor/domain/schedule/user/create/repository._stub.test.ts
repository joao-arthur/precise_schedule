import { assertEquals } from "@std/assert/assert-equals";
import { UserCreateRepositoryStub } from "./repo.stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserCreateRepositoryStub", async () => {
    assertEquals(
        await new UserCreateRepositoryStub().create(),
        ok(undefined),
    );
});
