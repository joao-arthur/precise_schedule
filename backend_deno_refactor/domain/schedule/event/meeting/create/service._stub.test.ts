import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../../model._stub.ts";
import { MeetingCreateServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../../lang/result.ts";

Deno.test("MeetingCreateServiceStub", async () => {
    assertEquals(
        await new MeetingCreateServiceStub(eventStub).create(),
        buildOk(eventStub),
    );
});
