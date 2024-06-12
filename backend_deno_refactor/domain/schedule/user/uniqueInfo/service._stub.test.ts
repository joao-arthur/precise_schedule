import { assertEquals } from "@std/assert/assert-equals";
import { UserUniqueInfoServiceStub } from "./service._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserUniqueInfoServiceStub", async () => {
    assertEquals(
        await new UserUniqueInfoServiceStub().validateNew(),
        ok(undefined),
    );
    assertEquals(
        await new UserUniqueInfoServiceStub().validateExisting(),
        ok(undefined),
    );
});
