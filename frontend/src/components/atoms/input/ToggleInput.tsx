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

function ToggleInputComp({ forwardedRef, ...props }: props) {
    return (
        <label className="relative inline-block w-20 h-10">
            <input
                {...props}
                ref={forwardedRef}
                type="checkbox"
                className="opacity-0 w-0 h-0 peer"
            />
            <span
                className={cl(
                    "absolute top-0 left-0 bottom-0 right-0",
                    "rounded-full",
                    "border border-gray-500",
                    "bg-gray-300 dark:bg-dark-lighter",
                    "transition-all duration-500",
                    //
                    "before:absolute",
                    "before:h-7 before:w-7",
                    "before:top-[5px]",
                    "before:left-[6px]",
                    "before:bg-white",
                    "before:rounded-full",
                    "before:transition-all before:duration-500",
                    //
                    "peer-disabled:before:bg-gray-200 peer-disabled:bg-gray-200",
                    "peer-disabled:before:dark:bg-dark-lighter peer-disabled:dark:bg-dark-lighter",
                    "peer-checked:bg-primary peer-checked:border-primary",
                    "peer-checked:before:left-[45px]",
                    "cursor-pointer peer-disabled:cursor-not-allowed",
                )}
            />
        </label>
    );
}

export const ToggleInput = forwardRef<HTMLInputElement | null, forwardedProps>(
    (props, ref) => <ToggleInputComp {...props} forwardedRef={ref} />,
);
