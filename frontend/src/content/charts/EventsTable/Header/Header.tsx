import { HeaderColumn } from "./HeaderColumn";

export function Header() {
    return (
        <thead>
            <tr>
                <HeaderColumn title="NAME" />
                <HeaderColumn title="CATEGORY" />
                <HeaderColumn title="IMPORTANCE" />
                <HeaderColumn title="FROM" />
                <HeaderColumn title="TO" />
                <HeaderColumn title="REPEATS" />
            </tr>
        </thead>
    );
}
