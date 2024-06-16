import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import {
    birthdayEventUpdateStub,
    birthdayStub,
    birthdayUpdatedStub,
    birthdayUpdateStub,
} from "./model.stub.ts";
import { eventRepoDataStubBuild } from "../repo.stub.ts";
import { birthdayUpdate, birthdayUpdateToEventUpdate } from "./update.ts";

Deno.test("birthdayUpdateToEventUpdate", () => {
    assertEquals(
        birthdayUpdateToEventUpdate(birthdayUpdateStub),
        birthdayEventUpdateStub,
    );
});

Deno.test("birthdayUpdate", async () => {
    assertEquals(
        await birthdayUpdate(
            eventRepoDataStubBuild([], birthdayStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "birthday-id",
            birthdayUpdateStub,
        ),
        ok(birthdayUpdatedStub),
    );
});
