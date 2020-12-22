import React from 'react';
import { DayBox, DayLabel, InvisibleDayBox } from './Cell.styles';

interface props {
    dia: number;
}

export default ({ dia }: props) =>
    dia ? (
        <DayBox
            onClick={() => {
                //console.log(props.children)
            }}
        >
            <DayLabel>{dia}</DayLabel>
        </DayBox>
    ) : (
        <InvisibleDayBox />
    );
