import type { ChangeEventHandler, FocusEventHandler, ForwardedRef } from "react";
import { forwardRef } from "react";
import { cl } from "@/lib/cl";

type option = {
    readonly id: string;
    readonly label: string;
};

type forwardedProps = {
    readonly name: string;
    readonly onChange?: ChangeEventHandler<HTMLSelectElement>;
    readonly onBlur?: FocusEventHandler<HTMLSelectElement>;
    readonly disabled?: boolean | undefined;
    readonly required?: boolean;
    readonly max?: string | number;
    readonly maxLength?: number;
    readonly min?: string | number;
    readonly minLength?: number;
    readonly options: readonly option[];
};

type props = forwardedProps & {
    readonly forwardedRef: ForwardedRef<HTMLSelectElement | null>;
};

function SelectInputComp({ forwardedRef, options, ...props }: props) {
    return (
        <select
            {...props}
            ref={forwardedRef}
            className={cl(
                "py-1 px-2 rounded-md text-base w-full box-border h-10 min-w-0",
                "border border-gray-500 disabled:cursor-not-allowed",
                "bg-white dark:bg-drk dark:text-pastel-gray",
                "disabled:bg-gray-200 dark:disabled:bg-dark-light",
                "transition-colors duration-100",
            )}
        >
            {options.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export const SelectInput = forwardRef<HTMLSelectElement | null, forwardedProps>(
    (props, ref) => <SelectInputComp {...props} forwardedRef={ref} />,
);
