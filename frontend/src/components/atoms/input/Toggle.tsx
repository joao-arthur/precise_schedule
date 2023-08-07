import { cl } from "@/lib/cl";

type props = {
    readonly required?: boolean;
    readonly value: boolean;
    readonly onChange: (newValue: boolean) => void;
    readonly display?: {
        readonly on: string;
        readonly off: string;
    };
};

export function Toggle({ value, onChange, display }: props) {
    return (
        <div
            onClick={() => onChange(!value)}
            className={cl(
                "cursor-pointer select-none",
                "border w-16 h-8 rounded-2xl ",
                "border-transparent",
                "transition-all duration-100",
                {
                    "bg-prm": value,
                    "bg-gray-300 dark:bg-drk-dk": !value,
                },
            )}
        >
            <div
                className={cl(
                    "flex justify-center items-center",
                    "bg-pastel-gray border-gray-500 w-6 h-6 rounded-2xl",
                    "transition-all duration-100",
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
