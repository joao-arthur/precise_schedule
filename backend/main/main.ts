import {
    Application,
    Router,
} from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { UserControllerOakAdapter } from "../infra/schedule/user/UserControllerOakAdapter.ts";
import { UserRepositoryMemory } from "@ps/infra/schedule/user/UserRepositoryMemory.ts";
import { EventControllerOakAdapter } from "../infra/schedule/event/EventControllerOakAdapter.ts";
import { EventRepositoryMemory } from "@ps/infra/schedule/event/EventRepositoryMemory.ts";
import { IdGeneratorRandom } from "@ps/infra/generate/IdGeneratorRandom.ts";
import { ValidatorImpl } from "@ps/infra/validation/ValidatorImpl.ts";
import { unauthorized } from "@ps/application/http/builder/unauthorized.ts";

import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { SessionMiddlewareImpl } from "@ps/application_impl/http/middleware/SessionMiddlewareImpl.ts";
import { ValidateUserSessionServiceImpl } from "@ps/domain_impl/schedule/userSession/ValidateUserSessionServiceImpl.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/DecodeSessionServiceJWTAdapter.ts";

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

const router = new Router();

userControllerAdapter.initRoutes(router);
eventControllerAdapter.initRoutes(router);

const app = new Application();
app.use(oakCors({ origin: "http://localhost:3000" }));

app.use(async (context, next) => {
    if (
        (
            context.request.method === "POST" &&
            context.request.url.pathname === "/user/login"
        ) || (
            context.request.method === "POST" &&
            context.request.url.pathname === "/user"
        )
    ) {
        await next();
        return;
    }
    try {
        await new SessionMiddlewareImpl(
            new ValidateUserSessionServiceImpl(
                new FindUserServiceImpl(userRepository),
                new DecodeSessionServiceJWTAdapter(),
            ),
        ).handle({
            headers: {
                Authorization: context.request.headers.get(
                    "Authorization",
                ),
            },
        });
    } catch {
        context.response.body = unauthorized().body;
        context.response.status = unauthorized().status;
        return;
    }
    await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
