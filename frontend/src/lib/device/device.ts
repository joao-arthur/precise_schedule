const WIDTH = 500;

type Dimensions = {
    readonly width: number;
    readonly height: number;
};

function isMobile(dimensions: Dimensions): boolean {
    return dimensions.width <= WIDTH;
}

function isDesktop(dimensions: Dimensions): boolean {
    return dimensions.width > WIDTH;
}

export const device = {
    isMobile,
    isDesktop,
} as const;
