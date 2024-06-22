export type DateGenerator = {
    readonly gen: () => Date;
};

export type IdGenerator = {
    readonly gen: () => string;
};
