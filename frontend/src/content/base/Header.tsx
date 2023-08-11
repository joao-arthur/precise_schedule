import type { ReactNode } from "react";
import { cl } from "@/lib/cl";
import { useTheme } from "@/features/theme/useTheme";
import { Toggle } from "@/components/atoms/input/Toggle";

type props = {
    readonly left: ReactNode;
};

export function Header({ left }: props) {
    const [theme, setTheme] = useTheme();

    return (
        <header
            className={cl(
                "flex w-full flex-shrink-0 justify-between px-2 h-12",
                "bg-prm dark:bg-prm-dk",
                "transition-colors duration-100",
            )}
        >
            <div className="flex items-center gap-3">
                {left}
            </div>
            <div className="flex items-center gap-3">
                <div className="w-16">
                    <Toggle
                        value={theme === "dark"}
                        onChange={setTheme}
                        display={{ on: "🌑", off: "☀️" }}
                    />
                </div>
            </div>
        </header>
    );
}
