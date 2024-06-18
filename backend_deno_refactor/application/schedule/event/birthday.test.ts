import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import {
    birthdayCreateStub,
    birthdayStub,
    birthdayUpdateStub,
} from "../../../domain/schedule/event/birthday/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { created, noContent } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { birthdayCreateController, birthdayUpdateController } from "./birthday.ts";

Deno.test("birthdayCreateController", async () => {
    assertEquals(
        await birthdayCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("birthday-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(birthdayCreateStub, {}),
        ),
        created(birthdayStub),
    );
});

Deno.test("birthdayUpdateController", async () => {
    assertEquals(
        await birthdayUpdateController(
            eventRepoOneStubBuild(birthdayStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(birthdayUpdateStub, { id: "birthday-id" }),
        ),
        noContent(),
    );
});
