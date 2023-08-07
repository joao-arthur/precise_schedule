import type { ChangeEventHandler, FocusEventHandler, ForwardedRef } from "react";
import { forwardRef } from "react";
import { cl } from "@/lib/cl";

type forwardedProps = {
    readonly name: string;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;
    readonly disabled?: boolean | undefined;
    readonly required?: boolean;
    readonly max?: string | number;
    readonly maxLength?: number;
    readonly min?: string | number;
    readonly minLength?: number;
};

type props = forwardedProps & {
    readonly forwardedRef: ForwardedRef<HTMLInputElement | null>;
};

function CheckInputComp({ forwardedRef, ...props }: props) {
    return (
        <input
            {...props}
            ref={forwardedRef}
            type="checkbox"
            className={cl(
                "py-1 px-2 rounded-md text-base w-full box-border h-10 min-w-0",
                "border border-gray-500 disabled:cursor-not-allowed",
                "bg-white dark:bg-drk dark:text-pastel-gray",
                "disabled:bg-gray-200 dark:disabled:bg-dark-light",
                "transition-colors duration-100",
            )}
        />
    );
}

export const CheckInput = forwardRef<HTMLInputElement | null, forwardedProps>(
    (props, ref) => <CheckInputComp {...props} forwardedRef={ref} />,
);
