import { Application, Router } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";
import { UserControllerOakAdapter } from "../infra/schedule/user/UserControllerOakAdapter.ts";
import { UserRepositoryMemory } from "@ps/infra/schedule/user/UserRepositoryMemory.ts";
import { EventControllerOakAdapter } from "../infra/schedule/event/EventControllerOakAdapter.ts";
import { EventRepositoryMemory } from "@ps/infra/schedule/event/EventRepositoryMemory.ts";
import { IdGeneratorRandom } from "@ps/infra/generate/IdGeneratorRandom.ts";
import { ValidatorImpl } from "@ps/infra/validation/Validator.impl.ts";
import { SessionMiddlewareOakAdapter } from "@ps/infra/http/middleware/SessionMiddlewareOakAdapter.ts";
import { ErrorHandlerMiddlewareOakAdapter } from "@ps/infra/http/middleware/ErrorHandlerMiddlewareOakAdapter.ts";

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

const app = new Application();
const router = new Router();

userControllerAdapter.initRoutes(router);
eventControllerAdapter.initRoutes(router);

const errorHandlerMiddleware = new ErrorHandlerMiddlewareOakAdapter();
const sessionMiddleware = new SessionMiddlewareOakAdapter(userRepository);

app.use(oakCors({ origin: "http://localhost:3000" }));
app.use(async (ctx, next) => {
    await errorHandlerMiddleware.handle(ctx, next);
});
app.use(async (ctx, next) => {
    await sessionMiddleware.handle(ctx, next);
});
app.use(router.routes());
app.use(router.allowedMethods());

const port = 8080;

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
