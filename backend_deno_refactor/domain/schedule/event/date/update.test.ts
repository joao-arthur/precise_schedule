import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import { dateEventUpdateStub, dateStub, dateUpdatedStub, dateUpdateStub } from "./model.stub.ts";
import { eventRepoOneStubBuild } from "../repo.stub.ts";
import { dateUpdateService, dateUpdateToEventUpdate } from "./update.ts";

Deno.test("dateUpdateToEventUpdate", () => {
    assertEquals(
        dateUpdateToEventUpdate(dateUpdateStub),
        dateEventUpdateStub,
    );
});

Deno.test("dateUpdateService", async () => {
    assertEquals(
        await dateUpdateService(
            eventRepoOneStubBuild(dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "date-id",
            dateUpdateStub,
        ),
        ok(dateUpdatedStub),
    );
});
