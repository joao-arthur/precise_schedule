import classNames from "classnames";

type props = {
    readonly name: string;
    readonly type: "select";
    readonly options: string[];
    readonly value: string;
    readonly onChange: (newValue: string) => void;
};

export function NavigationSelect(
    { name, options, value, onChange }: props,
) {
    return (
        <select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classNames(
                "border border-gray-300 dark:border-gray-500 mx-1 text-lg cursor-pointer text-center h-10",
                "text-gray-800",
                "rounded bg-white transition-colors hover:duration-200 duration-500",
                "hover:bg-pastel-gray active:bg-pastel-gray",
                "dark:text-pastel-gray dark:bg-dark-light dark:hover:bg-dark dark:active:bg-dark",
            )}
        >
            {options.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
