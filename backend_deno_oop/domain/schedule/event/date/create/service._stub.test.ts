import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { DateCreateServiceStub } from "./service._stub.ts";

Deno.test("DateCreateServiceStub", async () => {
    assertEquals(
        await new DateCreateServiceStub(
            eventStub,
        ).create(),
        eventStub,
    );
});
