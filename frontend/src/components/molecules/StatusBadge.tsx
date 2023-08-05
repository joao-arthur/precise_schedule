import { Text } from "../atoms/Text";
import { ErrorBadge } from "../atoms/badge/ErrorBadge";
import { SuccessBadge } from "../atoms/badge/SuccessBadge";

type props = {
    readonly valid: boolean;
    readonly label: string;
};

export function StatusBadge({ valid, label }: props) {
    return (
        <div className="flex items-center gap-2">
            {valid ? <SuccessBadge /> : <ErrorBadge />}
            <Text size="sm">{label}</Text>
        </div>
    );
}
