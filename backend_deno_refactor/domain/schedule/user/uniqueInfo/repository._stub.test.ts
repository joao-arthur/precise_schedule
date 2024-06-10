import { assertEquals } from "@std/assert/assert-equals";
import { UserUniqueInfoRepositoryStub } from "./repository._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserUniqueInfoRepositoryStub", async () => {
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countUsername(),
        buildOk(1),
    );
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countEmail(),
        buildOk(2),
    );
});
