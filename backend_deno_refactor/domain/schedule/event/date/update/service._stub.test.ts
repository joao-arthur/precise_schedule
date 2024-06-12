import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { DateUpdateServiceStub } from "./service._stub.ts";
import { ok } from "../../../../lang/result.ts";

Deno.test("DateUpdateServiceStub", async () => {
    assertEquals(
        await new DateUpdateServiceStub(eventStub).update(),
        ok(eventStub),
    );
});
