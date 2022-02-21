import styled from '@emotion/styled';

import { Result, Props } from './Result';

const Container = styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 2;
    margin: 0.5em 0em;
`;

export function Results() {
    const data: Array<Props> = [
        {name: 'Machin.pdf', type: 'pdf'},
        {name: 'Truc.jpg', type: 'img'},
        {name: 'Texte.txt', type: 'txt'},
    ];
    const items = data.map(({name, type}) => {
        return <Result name={name} type={type}/>;
    });
    
    return <Container>
        {items}
    </Container>;
}