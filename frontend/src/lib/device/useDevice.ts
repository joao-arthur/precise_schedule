import { useCallback } from "react";
import { useWindowSize } from "usehooks-ts";
import { device } from "./device";

export function useDevice() {
    const dimensions = useWindowSize();
    const isMobile = useCallback(
        () => device.isMobile(dimensions),
        [dimensions],
    );
    return { isMobile };
}
