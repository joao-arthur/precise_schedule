const WIDTH = 500;

type Dimensions = {
    readonly width: number;
    readonly height: number;
};

function isMobile(dimensions: Dimensions): boolean {
    return dimensions.width <= WIDTH;
}

export const device = {
    isMobile,
} as const;
