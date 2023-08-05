import { BaseBadge } from "./BaseBadge";

export function SuccessBadge() {
    return (
        <BaseBadge
            className="border-green-700 bg-green-100"
            iconName="check"
            iconClassName="fill-green-700 w-5 h-5"
        />
    );
}
