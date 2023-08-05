import { useRouter } from "next/router";
import { HoverButton } from "@/components/atoms/extraButton/HoverButton";
import { If } from "@/components/atoms/layout/If";
import { Link } from "@/components/atoms/Link";

export function AnonimousActions() {
    const { pathname } = useRouter();

    return (
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
    );
}
