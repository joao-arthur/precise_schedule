import { SubHeader } from "../../../base/subHeader/SubHeader";
import { NewButton } from "./NewButton";
import { Controls } from "./Controls";
import { LeftContent } from "./LeftContent";

export function Navigation() {
    return (
        <SubHeader
            left={<LeftContent />}
            center={<Controls />}
            right={<NewButton />}
        />
    );
}
