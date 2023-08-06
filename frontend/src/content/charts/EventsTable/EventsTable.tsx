import { mockedData } from "./mockedData";
import { LeftColumn } from "./LeftColumn";
import { RightColumn } from "./RightColumn";
import { CenterColumn } from "./CenterColumn";
import { DisabledColumn } from "./DisabledColumn";
import { HeaderColumn } from "./Header/HeaderColumn";

export function EventsTable() {
    return (
        <table className="flex-1 border-collapse w-screen">
            <thead>
                <tr>
                    <HeaderColumn title="NAME" />
                    <HeaderColumn title="CATEGORY" />
                    <HeaderColumn title="FROM" />
                    <HeaderColumn title="TO" />
                    <HeaderColumn title="REPEATS" />
                </tr>
            </thead>
            <tbody>
                {mockedData.map(
                    (
                        {
                            name,
                            category,
                            from,
                            to,
                            repeats,
                        },
                    ) => (
                        <tr>
                            <LeftColumn>{name}</LeftColumn>
                            <LeftColumn>{category}</LeftColumn>
                            <LeftColumn>{from}</LeftColumn>
                            <LeftColumn>{to}</LeftColumn>
                            <CenterColumn>{repeats}</CenterColumn>
                        </tr>
                    ),
                )}
            </tbody>
            <tfoot>
                <tr>
                    <DisabledColumn />
                    <RightColumn>
                        apointment: 10% meeting: 10% birthday: 10% party: 10% date: 10%
                    </RightColumn>
                    <DisabledColumn />
                    <DisabledColumn />
                    <RightColumn>yes: 75% no:25%</RightColumn>
                </tr>
            </tfoot>
        </table>
    );
}
