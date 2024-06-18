import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import {
    dateCreateStub,
    dateStub,
    dateUpdateStub,
} from "../../../domain/schedule/event/date/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { created, noContent } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { dateCreateController, dateUpdateController } from "./date.ts";

Deno.test("dateCreateController", async () => {
    assertEquals(
        await dateCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("date-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(dateCreateStub, {}),
        ),
        created(dateStub),
    );
});

Deno.test("dateUpdateController", async () => {
    assertEquals(
        await dateUpdateController(
            eventRepoOneStubBuild(dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(dateUpdateStub, { id: "date-id" }),
        ),
        noContent(),
    );
});
