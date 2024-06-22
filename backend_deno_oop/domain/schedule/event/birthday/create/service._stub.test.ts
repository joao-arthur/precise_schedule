import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { BirthdayCreateServiceStub } from "./service._stub.ts";

Deno.test("BirthdayCreateServiceStub", async () => {
    assertEquals(
        await new BirthdayCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
