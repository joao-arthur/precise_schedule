import { toast as hotToast } from "react-hot-toast";

export type Messages = {
    readonly loading: string;
    readonly error: string;
    readonly success: string;
};

export function toast<T>(promise: Promise<T>, messages: Messages) {
    return hotToast.promise(promise, messages, {
        style: {
            minWidth: "250px",
        },
    });
}
