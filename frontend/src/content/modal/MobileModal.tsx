import type { ReactNode } from "react";
import clss from "classnames";
import { Button } from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/Text";

export type modalProps = {
    readonly children: ReactNode;
    readonly title: string;
    readonly formId?: string;
    readonly onCancel: () => void;
    readonly onConfirm?: () => void;
};

export function MobileModal({
    children,
    title,
    formId,
    onCancel,
    onConfirm,
}: modalProps) {
    return (
        <div className="fixed w-full h-full bg-block">
            <div
                className={clss(
                    "flex flex-col absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
                    "bg-white dark:bg-dark",
                    "w-full h-full",
                )}
            >
                <div
                    className={clss(
                        "py-5 px-7 break-all",
                        "bg-primary",
                        "shadow-sm shadow-gray-500",
                    )}
                >
                    <Text size="2xl" color="white" selectable>{title}</Text>
                </div>
                <div className="flex-1 overflow-auto p-3">
                    {children}
                </div>
                <div
                    className={clss(
                        "flex p-5 flex-col gap-3",
                        "border-t border-gray-300 dark:border-gray-500",
                    )}
                >
                    <Button onClick={onConfirm} form={formId}>
                        CONFIRM
                    </Button>
                    <Button onClick={onCancel} secondary>
                        CANCEL
                    </Button>
                </div>
            </div>
        </div>
    );
}
