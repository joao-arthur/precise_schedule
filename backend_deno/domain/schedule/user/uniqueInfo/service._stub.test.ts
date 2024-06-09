import { assertEquals } from "std/testing/asserts.ts";
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
