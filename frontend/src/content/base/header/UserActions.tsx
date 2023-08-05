import { useCallback, useState } from "react";
import { TransparentIcon } from "@/components/atoms/TransparentIcon";
import { UserMenu } from "../userMenu/UserMenu";
import { If } from "@/components/atoms/layout/If";

export function UserActions() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const closeMenu = useCallback(() => setUserMenuOpen(false), []);

    return (
        <>
            <TransparentIcon
                name="user"
                className="fill-white h-8 w-8"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            <If condition={userMenuOpen}>
                <UserMenu closeMenu={closeMenu} />
            </If>
        </>
    );
}
