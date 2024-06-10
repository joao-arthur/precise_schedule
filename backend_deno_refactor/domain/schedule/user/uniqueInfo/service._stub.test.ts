import { assertEquals } from "@std/assert/assert-equals";
import { UserUniqueInfoServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserUniqueInfoServiceStub", async () => {
    assertEquals(
        await new UserUniqueInfoServiceStub().validateNew(),
        buildOk(undefined),
    );
    assertEquals(
        await new UserUniqueInfoServiceStub().validateExisting(),
        buildOk(undefined),
    );
});
