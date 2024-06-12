import { assertEquals } from "@std/assert/assert-equals";
import { UserUniqueInfoRepositoryStub } from "./repository._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserUniqueInfoRepositoryStub", async () => {
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countUsername(),
        ok(1),
    );
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countEmail(),
        ok(2),
    );
});
