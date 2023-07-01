import type { Messages } from "../toast";
import { toast } from "../toast";
import { useRequest } from "./useRequest";

export function useAppRequest() {
    const requestFns = useRequest();

    function handle<T>(req: Promise<T>, messages?: Messages) {
        return messages ? toast(req, messages) : req;
    }

    function getRequest<T>(resource: string, messages?: Messages) {
        return handle(requestFns.get<T>(resource), messages);
    }

    function postRequest<T>(
        resource: string,
        body: unknown,
        messages?: Messages,
    ) {
        return handle(requestFns.post<T>(resource, body), messages);
    }

    function putRequest<T>(
        resource: string,
        body: unknown,
        messages?: Messages,
    ) {
        return handle(requestFns.put<T>(resource, body), messages);
    }

    function deleteRequest<T>(resource: string, messages?: Messages) {
        return handle(requestFns.delete<T>(resource), messages);
    }

    return {
        get: getRequest,
        post: postRequest,
        put: putRequest,
        delete: deleteRequest,
    };
}
