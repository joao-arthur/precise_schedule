import { useRouter } from "next/router";
import { LinkButton } from "@/components/atoms/extraButton/LinkButton";
import { If } from "@/components/atoms/layout/If";

export function AnonimousActions() {
    const { pathname } = useRouter();

    return (
        <div>
            <If condition={pathname !== "/signin"}>
                <LinkButton to="/signin">
                    SIGN IN
                </LinkButton>
            </If>
            <If condition={pathname !== "/signup"}>
                <LinkButton to="/signup">
                    SIGN UP
                </LinkButton>
            </If>
        </div>
    );
}
