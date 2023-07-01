import clss from "classnames";
import type {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
} from "react";
import { forwardRef } from "react";

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

function PasswordInputComp(
    { forwardedRef, ...props }: props,
) {
    return (
        <input
            {...props}
            ref={forwardedRef}
            type="password"
            className={clss(
                "border border-gray-500 py-1 px-2 rounded-md text-base w-full box-border h-10",
                "bg-white dark:bg-dark-light dark:text-pastel-gray",
                "transition-colors duration-500",
            )}
        />
    );
}

export const PasswordInput = forwardRef<
    HTMLInputElement | null,
    forwardedProps
>(
    (props, ref) => (
        <PasswordInputComp {...props} forwardedRef={ref} />
    ),
);
