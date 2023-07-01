import { useEffect, useState } from "react";
import classNames from "classnames";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Link } from "@/components/atoms/Link";
import { UserMenuItem } from "./UserMenuItem";

export function UserMenu() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const onOutClick = () => setUserMenuOpen(false);
    const { unlog } = useSessionManager();

    useEffect(() => {
        globalThis.addEventListener("click", onOutClick);
        return () =>
            globalThis.removeEventListener("click", onOutClick);
    }, [onOutClick, userMenuOpen]);

    return (
        <nav
            className={classNames(
                "flex absolute bg-white top-10 right-1 border border-gray-500 rounded z-10 dark:bg-dark-light",
                "bg-white dark:bg-dark-light transition-colors duration-500",
            )}
        >
            <ul onClick={onOutClick}>
                <Link to="/settings">
                    <UserMenuItem name="Settings" icon="settings" />
                </Link>
                <div onClick={unlog}>
                    <UserMenuItem name="Sign out" icon="signOut" />
                </div>
            </ul>
        </nav>
    );
}
