import { Header } from "./Header/Header";
import { mockedData } from "./mockedData";
import { LeftColumn } from "./LeftColumn";
import { RightColumn } from "./RightColumn";
import { CenterColumn } from "./CenterColumn";
import { DisabledColumn } from "./DisabledColumn";

export function EventsTable() {
    return (
        <table className="flex-1 border-collapse w-screen">
            <Header />
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
                        apointment: 10% meeting: 10% birthday: 10%
                        party: 10% date: 10%
                    </RightColumn>
                    <DisabledColumn />
                    <DisabledColumn />
                    <RightColumn>yes: 75% no:25%</RightColumn>
                </tr>
            </tfoot>
        </table>
    );
}
