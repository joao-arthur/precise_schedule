import type { CreateUser, Login } from "./user";
import { useMutation } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";
import { Session } from "../session/session";

export function useUserCreate() {
    const request = useAppRequest();
    return useMutation(
        "user/create",
        (user: CreateUser) =>
            request.post<Session>("user", user, {
                loading: "registering you...",
                success: `Welcome ${user.username}`,
            }),
    );
}

export function useUserLogin() {
    const request = useAppRequest();
    return useMutation(
        "user/login",
        (user: Login) =>
            request.post<Session>("user/login", user, {
                loading: "logging in...",
                success: `Welcome ${user.username}`,
            }),
    );
}
