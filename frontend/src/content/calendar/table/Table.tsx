import { useSession } from "@/features/session/useSession";
import { If } from "@/components/atoms/layout/If";
import { Actions } from "./actions/Actions";
import { Display } from "./display/Display";
import { TableWrapper } from "./TableWrapper";

export function Table() {
    const logged = useSession().logged();

    return (
        <>
            <TableWrapper>
                <Display />
            </TableWrapper>
            <If condition={logged}>
                <Actions />
            </If>
        </>
    );
}
