import { Header } from "./Header";
import { Body } from "./Body";

export function Display() {
    return (
        <div className="flex flex-col flex-1">
            <Header />
            <Body />
        </div>
    );
}
