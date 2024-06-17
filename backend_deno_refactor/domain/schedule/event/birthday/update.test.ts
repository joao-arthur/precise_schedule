import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import {
    birthdayEventUpdateStub,
    birthdayStub,
    birthdayUpdatedStub,
    birthdayUpdateStub,
} from "./model.stub.ts";
import { eventRepoStubBuild } from "../repo.stub.ts";
import { birthdayUpdateService, birthdayUpdateToEventUpdate } from "./update.ts";

Deno.test("birthdayUpdateToEventUpdate", () => {
    assertEquals(
        birthdayUpdateToEventUpdate(birthdayUpdateStub),
        birthdayEventUpdateStub,
    );
});

Deno.test("birthdayUpdateService", async () => {
    assertEquals(
        await birthdayUpdateService(
            eventRepoStubBuild([], birthdayStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "birthday-id",
            birthdayUpdateStub,
        ),
        ok(birthdayUpdatedStub),
    );
});
