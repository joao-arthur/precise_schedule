import { toast as hotToast } from "react-hot-toast";

export type Messages = {
    readonly loading: string;
    //readonly error: string;
    readonly success: string;
};

export function toast<T>(promise: Promise<T>, messages: Messages) {
    return hotToast.promise(
        promise,
        {
            success: messages.success,
            loading: messages.loading,
            error: (err) => {
                if (err instanceof Error) {
                    window.setTimeout(() => hotToast.remove(), 50);
                    return "";
                }
                return err;
            },
        },
        {
            position: "top-left",
            style: {
                minWidth: "250px",
            },
        },
    );
}
