import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    birthdayStub,
    birthdayUpdateStub,
} from "../../../../domain/schedule/event/birthday/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { birthdayUpdateController } from "./update.ts";
import { eventRepoOneStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
