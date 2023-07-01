import { useState } from "react";
import { TransparentIcon } from "@/components/atoms/TransparentIcon";
import { UserMenu } from "../userMenu/UserMenu";
import { If } from "@/components/atoms/layout/If";

export function UserActions() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <>
            <TransparentIcon
                name="user"
                size={30}
                color="white"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            <If condition={userMenuOpen}>
                <UserMenu />
            </If>
        </>
    );
}
