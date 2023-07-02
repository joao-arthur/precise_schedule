import { useDevice } from "@/lib/device/useDevice";
import { Content } from "./Content";
import { Actions } from "./actions/Actions";

export function Table() {
    const device = useDevice();
    const isMobile = device.isMobile();

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
            <Actions />
        </>
    );
}
