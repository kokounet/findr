import styled from '@emotion/styled'

import logo from '../logo.svg'

const Container = styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4em 0 0.2em;
    font-size: 1.2em;
`;

const Logo = styled.img`
    height: 1em;
    margin: 0vw 1vw;
    pointer-events: none;
`;

export function Title() {
    return <Container>
        <Logo src={logo} alt="logo" />
        Findr
    </Container>;
}
