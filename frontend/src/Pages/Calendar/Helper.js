const monthDays = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const nomeDosMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

export const diasDaSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
];

export const getMonthTotalDays = (year, month) =>
    month !== 1
        ? monthDays[month]
        : monthDays[1][
              +((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
          ];

export const monthDaysToGrid = (year, month) => {
    const firstDayOfWeekInMonth = new Date(year, month, 1).getDay();
    const monthDays = getMonthTotalDays(year, month);
    let valores = [];
    for (
        let i = 1 - firstDayOfWeekInMonth;
        i <= 42 - firstDayOfWeekInMonth;
        i++
    ) {
        if (i >= 1 && i <= monthDays) {
            valores.push(i);
            continue;
        }

        valores.push(NaN);
    }
    let novosElementos = [];

    novosElementos.push(valores.splice(0, 7));
    novosElementos.push(valores.splice(0, 7));
    novosElementos.push(valores.splice(0, 7));
    novosElementos.push(valores.splice(0, 7));
    novosElementos.push(valores.splice(0, 7));
    novosElementos.push(valores.splice(0, 7));
    return novosElementos;
};
