import type { ReactNode } from "react";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { Button } from "../atoms/button/Button";
import { Text } from "../atoms/Text";

export type modalProps = {
    readonly children: ReactNode;
    readonly title: string;
    readonly formId?: string;
    readonly onCancel: () => void;
    readonly onConfirm?: () => void;
    readonly confirmLabel?: string;
    readonly hideConfirm?: true;
};

export function ModalComponent({
    children,
    title,
    formId,
    onCancel,
    onConfirm,
    confirmLabel,
    hideConfirm,
}: modalProps) {
    const isMobile = useDevice().isMobile();

    return (
        <div className="fixed w-full h-full bg-block">
            <div
                className={cl(
                    "flex flex-col absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
                    "bg-white dark:bg-drk-dk2",
                    isMobile
                        ? "w-full h-full"
                        : "w-120 max-w-4/5 border border-gray-300 dark:border-gray-500 rounded",
                )}
            >
                <div
                    className={cl(
                        "py-5 px-7 break-all bg-prm",
                        "shadow-sm shadow-gray-500",
                    )}
                >
                    <Text size="2xl" color="white" selectable>{title}</Text>
                </div>
                <div className="flex-1 overflow-auto p-3">
                    {children}
                </div>
                <div
                    className={cl(
                        isMobile ? "flex-col-reverse p-4 gap-4" : "p-2 justify-end gap-2",
                        "flex border-t border-gray-300 dark:border-gray-500",
                    )}
                >
                    <Button onClick={onCancel} type="SECONDARY">
                        CANCEL
                    </Button>
                    {!hideConfirm
                        ? (
                            <Button onClick={onConfirm} form={formId}>
                                {confirmLabel || "CONFIRM"}
                            </Button>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
}
