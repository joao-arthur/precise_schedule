import { assertEquals } from "std/assert/assert_equals.ts";
import { UserUniqueInfoServiceStub } from "./service._stub.ts";

Deno.test("UserUniqueInfoServiceStub", async () => {
    assertEquals(
        await new UserUniqueInfoServiceStub().validateNew(),
        undefined,
    );
    assertEquals(
        await new UserUniqueInfoServiceStub().validateExisting(),
        undefined,
    );
});
