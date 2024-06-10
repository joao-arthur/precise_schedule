import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { BirthdayCreateServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../../lang/result.ts";

Deno.test("BirthdayCreateServiceStub", async () => {
    assertEquals(
        await new BirthdayCreateServiceStub(eventStub).create(),
        buildOk(eventStub),
    );
});
