import { useEffect } from "react";
import clss from "classnames";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Link } from "@/components/atoms/Link";
import { UserMenuItem } from "./UserMenuItem";

type props = {
    readonly closeMenu: () => void;
};

export function UserMenu({ closeMenu }: props) {
    const { unlog } = useSessionManager();

    useEffect(() => {
        // ¯\_(ツ)_/¯ it just works
        window.setTimeout(() => {
            window.addEventListener("click", closeMenu);
        }, 0);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

    return (
        <nav
            className={clss(
                "flex absolute top-10 right-1 border border-gray-500 rounded z-10",
                "bg-white dark:bg-dark-light",
                "transition-colors duration-500",
            )}
        >
            <ul>
                <Link to="/settings">
                    <UserMenuItem name="Settings" icon="cog-wheel" />
                </Link>
                <div onClick={unlog}>
                    <UserMenuItem name="Sign out" icon="door" />
                </div>
            </ul>
        </nav>
    );
}
