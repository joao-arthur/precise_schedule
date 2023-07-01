import clss from "classnames";
import { useTheme } from "@/features/theme/useTheme";
import { useSession } from "@/features/session/useSession";
import { Toggle } from "@/components/atoms/input/Toggle";
import { AnonimousActions } from "./AnonimousActions";
import { UserActions } from "./UserActions";

export function Header() {
    const { logged } = useSession();
    const [theme, setTheme] = useTheme();

    return (
        <header
            className={clss(
                "flex flex-0 py-1 px-2 justify-end h-10 gap-6 items-center",
                "bg-primary-dark dark:bg-primary-darker",
                "transition-colors duration-500",
            )}
        >
            <Toggle
                value={theme === "dark"}
                onChange={setTheme}
                display={{ on: "🌑", off: "☀️" }}
            />
            {logged() ? <UserActions /> : <AnonimousActions />}
        </header>
    );
}
