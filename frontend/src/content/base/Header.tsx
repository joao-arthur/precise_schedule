import type { ReactNode } from "react";
import { useRouter } from "next/router";
import { cl } from "@/lib/cl";
import { useTheme } from "@/features/theme/useTheme";
import { useSession } from "@/features/session/useSession";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Toggle } from "@/components/atoms/input/Toggle";
import { HoverButton } from "@/components/atoms/extraButton/HoverButton";
import { Link } from "@/components/atoms/Link";
import { If } from "@/components/atoms/layout/If";

type props = {
    readonly left: ReactNode;
};

export function Header({ left }: props) {
    const logged = useSession().logged();
    const [theme, setTheme] = useTheme();
    const { pathname } = useRouter();
    const { unlog } = useSessionManager();

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
                {logged
                    ? (
                        <HoverButton onClick={unlog}>
                            SIGN OUT
                        </HoverButton>
                    )
                    : (
                        <div>
                            <If condition={pathname !== "/signin"}>
                                <Link to="/signin">
                                    <HoverButton>
                                        SIGN IN
                                    </HoverButton>
                                </Link>
                            </If>
                            <If condition={pathname !== "/signup"}>
                                <Link to="/signup">
                                    <HoverButton>
                                        SIGN UP
                                    </HoverButton>
                                </Link>
                            </If>
                        </div>
                    )}
            </div>
        </header>
    );
}
