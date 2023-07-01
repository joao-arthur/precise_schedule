import { Display } from "./Display/Display";
import { Navigation } from "./Navigation/Navigation";
import { useDevice } from "@/lib/device/useDevice";

export function Table() {
    const device = useDevice();
    const isMobile = device.isMobile();

    return isMobile
        ? (
            <div className="flex overflow-hidden flex-initial">
                <div className="flex flex-grow-0">
                    <div className="flex flex-grow w-screen flex-col">
                        <Navigation />
                        <Display />
                    </div>
                </div>
            </div>
        )
        : (
            <div className="flex overflow-hidden flex-col flex-grow ">
                <Navigation />
                <Display />
            </div>
        );
}
