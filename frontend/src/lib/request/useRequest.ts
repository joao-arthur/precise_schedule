import type { Headers } from "./request";
import { StatusCodes } from "http-status-codes";
import { useSessionManager } from "@/features/session/useSessionManager";
import { useLocalStorage } from "../storage/useLocalStorage";
import { request } from "./request";

export function useRequest() {
    const { unlog } = useSessionManager();
    const { getItem } = useLocalStorage<string>("token");

    function headers(): Headers | undefined {
        const token = getItem();
        return token
            ? { Authorization: `Bearer ${token}` }
            : undefined;
    }

    function catchError<T extends Response>(res: T): T {
        if (res.status === StatusCodes.UNAUTHORIZED) unlog();
        throw new Error(res.statusText);
    }

    function getRequest<T>(resource: string): Promise<T> {
        return request.get<T>(resource, headers()).catch(catchError);
    }

    function postRequest<T>(
        resource: string,
        body: unknown,
    ): Promise<T> {
        return request.post<T>(resource, body, headers()).catch(
            catchError,
        );
    }

    function putRequest<T>(
        resource: string,
        body: unknown,
    ): Promise<T> {
        return request.put<T>(resource, body, headers()).catch(
            catchError,
        );
    }

    function deleteRequest<T>(resource: string): Promise<T> {
        return request.delete<T>(resource, headers()).catch(
            catchError,
        );
    }

    return {
        get: getRequest,
        post: postRequest,
        put: putRequest,
        delete: deleteRequest,
    };
}
