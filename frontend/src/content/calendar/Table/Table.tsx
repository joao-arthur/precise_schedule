import { Icon } from "@/components/atoms/Icon";
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
                        <button className="rounded bg-primary absolute right-0 bottom-0 w-11 h-11">
                            +
                        </button>
                    </div>
                </div>
            </div>
        )
        : (
            <div className="flex overflow-hidden flex-col flex-grow ">
                <Navigation />
                <Display />
                <button className="rounded-full bg-primary absolute right-20 bottom-20 w-20 h-20">
                    <Icon
                        name="plus"
                        className="fill-primary-darker w-20 h-20"
                    />
                </button>
            </div>
        );
}
