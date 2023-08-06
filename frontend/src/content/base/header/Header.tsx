import type { ReactNode } from "react";
import { cl } from "@/lib/cl";
import { useTheme } from "@/features/theme/useTheme";
import { useSession } from "@/features/session/useSession";
import { Toggle } from "@/components/atoms/input/Toggle";
import { AnonimousActions } from "./AnonimousActions";
import { UserActions } from "./UserActions";

type props = {
    readonly left: ReactNode;
};

export function Header({ left }: props) {
    const logged = useSession().logged();
    const [theme, setTheme] = useTheme();

    return (
        <header
            className={cl(
                "flex w-full flex-shrink-0 justify-between px-2 h-12",
                "bg-primary dark:bg-primary-dark",
                "transition-colors duration-300",
            )}
        >
            <div className="flex items-center gap-3">
                {left}
            </div>
            <div className="flex items-center gap-3">
                <Toggle
                    value={theme === "dark"}
                    onChange={setTheme}
                    display={{ on: "🌑", off: "☀️" }}
                />
                {logged ? <UserActions /> : <AnonimousActions />}
            </div>
        </header>
    );
}
