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

function DateInputComp(
    { forwardedRef, ...props }: props,
) {
    return (
        <input
            {...props}
            ref={forwardedRef}
            type="date"
            className="border border-gray-500 py-1 px-2 rounded-md bg-white text-base w-full box-border h-10 dark:bg-dark-light dark:text-pastel-gray transition-colors duration-500"
        />
    );
}

export const DateInput = forwardRef<
    HTMLInputElement | null,
    forwardedProps
>(
    (props, ref) => <DateInputComp {...props} forwardedRef={ref} />,
);
