import { SubHeader } from "../base/subHeader/SubHeader";
import { Link } from "@/components/atoms/Link";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";

export function Header() {
    return (
        <SubHeader
            left={
                <Link to="/">
                    <ButtonIcon
                        title="calendar"
                        name="calendar"
                        type="bigicon"
                    />
                </Link>
            }
            right={
                <div className="flex items-center gap-2">
                    <ButtonIcon
                        title="filter"
                        name="filter"
                        type="bigicon"
                    />
                </div>
            }
        />
    );
}
