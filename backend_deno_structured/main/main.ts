import { Application, Router } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";

import { idGeneratorRandom } from "../infra/generator/idGeneratorRandom.ts";
import { dateGeneratorNow } from "../infra/generator/dateGeneratorNow.ts";

import { userRepoMemory } from "../infra/schedule/userRepoMemory.ts";
import { eventRepoMemory } from "../infra/schedule/eventRepoMemory.ts";

import { userControllerOak } from "../infra/schedule/userControllerOak.ts";
import { eventControllerOak } from "../infra/schedule/eventControllerOak.ts";
import { sessionMiddlewareOak } from "../infra/http/sessionMiddlewareOak.ts";
import { sessionJWT } from "../infra/session/sessionJWT.ts";

const idGenerator = idGeneratorRandom();
const dateGenerator = dateGeneratorNow();

const userRepo = userRepoMemory();
const eventRepo = eventRepoMemory();

const app = new Application();
const router = new Router();

const sessionService = sessionJWT();

userControllerOak(userRepo, idGenerator, dateGenerator, sessionService, router);
eventControllerOak(eventRepo, idGenerator, dateGenerator, router);

app.use(oakCors({ origin: "http://localhost:3000" }));

app.use(async (ctx, next) => {
    await sessionMiddlewareOak(userRepo, ctx, next);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8080;

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
