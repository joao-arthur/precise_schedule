import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import { birthdayCreateStub, birthdayEventCreateStub, birthdayStub } from "./model.stub.ts";
import { birthdayCreateService, birthdayCreateToEventCreate } from "./create.ts";

Deno.test("birthdayCreateToEventCreate", () => {
    assertEquals(
        birthdayCreateToEventCreate(birthdayCreateStub),
        birthdayEventCreateStub,
    );
});

Deno.test("birthdayCreateService", async () => {
    assertEquals(
        await birthdayCreateService(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("birthday-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            birthdayCreateStub,
        ),
        ok(birthdayStub),
    );
});
