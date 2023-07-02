import { Display } from "./Display/Display";
import { Navigation } from "./Navigation/Navigation";
import { Actions } from "./Actions/Actions";

export function Content() {
    return (
        <>
            <Navigation />
            <Display />
            <Actions />
        </>
    );
}
