import clss from "classnames";

type props = {
    readonly required?: boolean;
    readonly value: boolean;
    readonly onChange: (newValue: boolean) => void;
    readonly display?: {
        readonly on: string;
        readonly off: string;
    };
};

export function Toggle({
    value,
    onChange,
    display,
}: props) {
    return (
        <div
            onClick={() => {
                onChange(!value);
            }}
            className={clss(
                "cursor-pointer select-none",
                "border w-16 h-8 rounded-2xl ",
                "border-transparent",
                "transition-all hover:duration-300 duration-500",
                {
                    "bg-primary": value,
                    "bg-gray-300 dark:bg-dark-light": !value,
                },
            )}
        >
            <div
                className={clss(
                    "flex justify-center items-center",
                    "bg-white border-gray-500 w-6 h-6 rounded-2xl",
                    "transition-all duration-300",
                    "relative top-[3px]",
                    {
                        "left-[35px]": value,
                        "left-[3px]": !value,
                    },
                )}
            >
                {value && display?.on ? display.on : !value && display?.off ? display.off : null}
            </div>
        </div>
    );
}
