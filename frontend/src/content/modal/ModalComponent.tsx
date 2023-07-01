import type { ReactNode } from "react";
import classNames from "classnames";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/typography/Text";
import { useDevice } from "@/lib/device/useDevice";

export type modalProps = {
    readonly children: ReactNode;
    readonly title: string;
    readonly onCancel: () => void;
    readonly onConfirm?: () => void;
};

export function ModalComponent({
    children,
    title,
    onCancel,
    onConfirm,
}: modalProps) {
    const device = useDevice();
    const isMobile = device.isMobile();
    const isDesktop = device.isDesktop();

    return (
        <div className="fixed w-full h-full bg-block z-10">
            <div
                className={classNames(
                    "flex flex-col absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
                    "bg-white dark:bg-dark ",
                    {
                        "w-120 max-w-4/5 border border-gray-300 dark:border-gray-500 rounded":
                            isDesktop,
                        "w-full h-full": isMobile,
                    },
                )}
            >
                <div className="p-3 border-gray-300 dark:border-gray-500 border-b text-2xl">
                    <Text className="select-none m-0">{title}</Text>
                </div>
                <div className="flex-1 overflow-auto p-3">
                    {children}
                </div>
                <div
                    className={classNames(
                        "flex p-3 border-gray-300 dark:border-gray-500 border-t",
                        {
                            "flex-col": isMobile,
                            "justify-end": isDesktop,
                        },
                    )}
                >
                    <Button
                        onClick={onCancel}
                        secondary
                        className={classNames({
                            "ml-3 w-36": isDesktop,
                            "my-1 mx-3": isMobile,
                        })}
                    >
                        CANCEL
                    </Button>
                    {onConfirm
                        ? (
                            <Button
                                onClick={onConfirm}
                                className={classNames({
                                    "ml-3 w-36": isDesktop,
                                    "my-1 mx-3": isMobile,
                                })}
                            >
                                CONFIRM
                            </Button>
                        )
                        : null}
                </div>
            </div>
        </div>
    );
}
