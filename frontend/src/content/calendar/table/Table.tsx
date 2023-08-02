import { useDevice } from "@/lib/device/useDevice";
import { Content } from "./Content";
import { Actions } from "./actions/Actions";
import { useSession } from "@/features/session/useSession";
import { If } from "@/components/atoms/layout/If";

export function Table() {
    const isMobile = useDevice().isMobile();
    const logged = useSession().logged();

    return (
        <>
            {isMobile
                ? (
                    <div className="flex overflow-hidden flex-initial">
                        <div className="flex flex-grow-0">
                            <div className="flex flex-grow w-screen flex-col">
                                <Content />
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="flex overflow-hidden flex-col flex-grow">
                        <Content />
                    </div>
                )}
            <If condition={logged}>
                <Actions />
            </If>
        </>
    );
}
