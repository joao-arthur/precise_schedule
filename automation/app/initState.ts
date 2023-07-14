import type { Session } from "../domain/session/session.ts";

import { nanoid } from "nanoid/mod.ts";
import { State } from "./state.ts";
import { request } from "../infra/request.ts";

export async function initState(): Promise<void> {
    if (State.getState().getToken()) {
        return;
    }
    const res = await request.post<Session>("user", {
        username: nanoid(),
        password: "0123456789",
        email: `${nanoid()}@gmail.com`,
    });
    State.getState().setToken(res.body.token);
}
