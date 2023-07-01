import type { CreateUser, Login } from "./user";
import { useMutation } from "react-query";
import { useAppRequest } from "@/lib/request/useAppRequest";
import { Session } from "../session/session";

export function useUserAPI() {
    const request = useAppRequest();

    function create() {
        return useMutation(
            "user/create",
            (user: CreateUser) =>
                request.post<Session>("user", user, {
                    loading: "registering you...",
                    error: "We were unable to register you!",
                    success: `Welcome ${user.username}`,
                }),
        );
    }

    function login() {
        return useMutation(
            "user/login",
            (user: Login) =>
                request.post<Session>("user/login", user, {
                    loading: "logging in...",
                    error: "User not found!",
                    success: `Welcome ${user.username}`,
                }),
        );
    }

    return {
        create,
        login,
    };
}
