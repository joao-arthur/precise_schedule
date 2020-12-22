import styled from 'styled-components';

//#42a5f5 primary
//#80d6ff light
//#0077c2 dark

//#f2f2f2  primary gray
//#aeaeae  dark gray

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #42a5f5;
    box-shadow: 0px 3px 3px darkgrey;
`;

export const Button = styled.button`
    width: 2rem;
    height: 2rem;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    background-color: unset;
    color: white;
`;

export const HeaderTitle = styled.p`
    width: 150px;
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
    white-space: nowrap;
    list-style: none;
    color: white;
`;

export const Body = styled.table`
    width: 100%;
    box-shadow: inset 0px 3px 3px darkgrey;
    background-color: #fff5ff;
`;

export const BodyHeader = styled.th`
    text-align: center;
    padding: 10px 0;
`;
