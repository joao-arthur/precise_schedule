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
            className="border-gray-300 border rounded p-1 bg-white"
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
