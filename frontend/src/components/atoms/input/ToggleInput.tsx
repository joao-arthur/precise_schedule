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

function ToggleInputComp({ forwardedRef, ...props }: props) {
    return (
        <label className="relative inline-block w-16 h-8">
            <input
                {...props}
                ref={forwardedRef}
                type="checkbox"
                className="opacity-0 w-0 h-0 peer"
            />
            <span
                className={clss(
                    "absolute cursor-pointer top-0 left-0 bottom-0 right-0",
                    "rounded-full",
                    "border border-gray-500",
                    "bg-gray-300 dark:bg-dark-lighter",
                    "transition-all duration-500",
                    //
                    "disabled:bg-gray-200 dark:disabled:bg-dark-light",
                    "before:top-[3px]",
                    //
                    "before:absolute",
                    "before:h-6",
                    "before:w-6",
                    "before:bg-white",
                    "before:rounded-full",
                    "before:left-1",
                    "before:transition-all before:duration-500",
                    //
                    "peer-disabled:before:bg-gray-200 peer-disabled:bg-gray-200",
                    "peer-disabled:before:dark:bg-dark-lighter peer-disabled:dark:bg-dark-lighter",
                    "peer-checked:bg-primary peer-checked:border-primary",
                    "peer-checked:before:left-8",
                )}
            />
        </label>
    );
}

export const ToggleInput = forwardRef<
    HTMLInputElement | null,
    forwardedProps
>(
    (props, ref) => <ToggleInputComp {...props} forwardedRef={ref} />,
);
