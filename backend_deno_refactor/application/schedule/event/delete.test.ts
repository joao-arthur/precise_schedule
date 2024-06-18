import { assertEquals } from "@std/assert/assert-equals";
import { noContent } from "../../http/response.ts";
import { eventDeleteController } from "./delete.ts";
import { eventRepoEmptyStubBuild } from "../../../domain/schedule/event/repo.stub.ts";
import { requestBuild } from "../../http/request.stub.ts";

Deno.test("eventDeleteController", async () => {
    assertEquals(
        await eventDeleteController(
            eventRepoEmptyStubBuild(),
            "user-id",
            requestBuild(undefined, { id: "appointment-id" }),
        ),
        noContent(),
    );
});
