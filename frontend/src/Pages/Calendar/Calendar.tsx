import React, { useState, useCallback } from 'react';
import * as Style from './Calendar.styles';
import Cell from './Cell';
import { monthDaysToGrid, diasDaSemana, nomeDosMeses } from './Helper';

export default function Calendar() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const handleAddMonth = () => {
        if (selectedMonth < 11) return setSelectedMonth(selectedMonth + 1);
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
    };

    const handleSubMonth = () => {
        if (selectedMonth > 0) return setSelectedMonth(selectedMonth - 1);
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
    };

    const diasFormatados = useCallback(
        () => monthDaysToGrid(selectedYear, selectedMonth),
        [selectedYear, selectedMonth]
    );

    return (
        <>
            <Style.Header>
                <Style.Button onClick={() => setSelectedYear(selectedYear - 1)}>
                    {'<<'}
                </Style.Button>
                <Style.Button onClick={handleSubMonth}>{'<'}</Style.Button>
                <Style.HeaderTitle>{`${nomeDosMeses[selectedMonth]} ${selectedYear}`}</Style.HeaderTitle>
                <Style.Button onClick={handleAddMonth}>{'>'}</Style.Button>
                <Style.Button onClick={() => setSelectedYear(selectedYear + 1)}>
                    {'>>'}
                </Style.Button>
            </Style.Header>
            <Style.Body>
                <thead>
                    <tr>
                        {diasDaSemana.map(dia => (
                            <Style.BodyHeader>{dia}</Style.BodyHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {diasFormatados().map(semana => (
                        <tr>
                            {semana.map(dia => (
                                <Cell dia={dia} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Style.Body>
        </>
    );
}
