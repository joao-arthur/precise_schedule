import styled from 'styled-components';

export const DayBox = styled.td`
    width: calc(100% / 7);
    height: 5rem;
    cursor: pointer;

    &:hover {
        background-color: #80d6ff;
    }
`;

export const InvisibleDayBox = styled.td`
    width: calc(100% / 7);
    height: 5rem;
`;

export const DayLabel = styled.p`
    text-align: center;
    margin: auto;
`;
