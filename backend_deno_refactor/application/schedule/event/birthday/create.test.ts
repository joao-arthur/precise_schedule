import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import {
    birthdayCreateStub,
    birthdayStub,
} from "../../../../domain/schedule/event/birthday/model.stub.ts";
import { created } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { birthdayCreateController } from "./create.ts";
import { eventRepoEmptyStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
