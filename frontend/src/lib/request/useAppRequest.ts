import type { Messages } from "../toast";
import { toast } from "../toast";
import { useRequest } from "./useRequest";

export function useAppRequest() {
    const requestFns = useRequest();

    function handle<T>(req: Promise<T>, messages?: Messages) {
        return messages ? toast(req, messages) : req;
    }

    function getRequest<T = void>(
        resource: string,
        messages?: Messages,
    ) {
        return handle(requestFns.get<T>(resource), messages);
    }

    function postRequest<T = void>(
        resource: string,
        body: unknown,
        messages?: Messages,
    ) {
        return handle(requestFns.post<T>(resource, body), messages);
    }

    function putRequest<T = void>(
        resource: string,
        body: unknown,
        messages?: Messages,
    ) {
        return handle(requestFns.put<T>(resource, body), messages);
    }

    function deleteRequest<T = void>(
        resource: string,
        messages?: Messages,
    ) {
        return handle(requestFns.delete<T>(resource), messages);
    }

    return {
        get: getRequest,
        post: postRequest,
        put: putRequest,
        delete: deleteRequest,
    };
}
