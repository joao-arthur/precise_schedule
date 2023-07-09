import { Application, Router } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";
import { UserControllerOakAdapter } from "../infra/schedule/user/UserControllerOakAdapter.ts";
import { UserRepositoryMemory } from "@ps/infra/schedule/user/UserRepositoryMemory.ts";
import { EventControllerOakAdapter } from "../infra/schedule/event/EventControllerOakAdapter.ts";
import { EventRepositoryMemory } from "@ps/infra/schedule/event/EventRepositoryMemory.ts";
import { IdGeneratorRandom } from "@ps/infra/generate/IdGeneratorRandom.ts";
import { ValidatorImpl } from "@ps/infra/validation/ValidatorImpl.ts";
import { SessionMiddlewareOakAdapter } from "@ps/infra/session/SessionMiddlewareOakAdapter.ts";

const port = 8080;

const idGenerator = new IdGeneratorRandom();
const validator = new ValidatorImpl();

const userRepository = new UserRepositoryMemory();
const userControllerAdapter = new UserControllerOakAdapter(
    idGenerator,
    validator,
    userRepository,
);

const eventRepository = new EventRepositoryMemory();
const eventControllerAdapter = new EventControllerOakAdapter(
    idGenerator,
    validator,
    eventRepository,
);

const sessionMiddleware = new SessionMiddlewareOakAdapter(userRepository);

const app = new Application();
const router = new Router();

userControllerAdapter.initRoutes(router);
eventControllerAdapter.initRoutes(router);

app.use(oakCors({ origin: "http://localhost:3000" }));
app.use(async (context, next) => {
    await sessionMiddleware.handle(context, next);
});
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
