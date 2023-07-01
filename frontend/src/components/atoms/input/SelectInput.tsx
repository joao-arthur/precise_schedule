import clss from "classnames";
import type {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
} from "react";
import { forwardRef } from "react";

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

function SelectInputComp(
    { forwardedRef, options, ...props }: props,
) {
    return (
        <select
            {...props}
            ref={forwardedRef}
            className={clss(
                "border border-gray-500 py-1 px-2 rounded-md text-base w-full box-border h-10",
                "bg-white dark:bg-dark-light dark:text-pastel-gray",
                "transition-colors duration-500",
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

export const SelectInput = forwardRef<
    HTMLSelectElement | null,
    forwardedProps
>(
    (props, ref) => <SelectInputComp {...props} forwardedRef={ref} />,
);
