import styled from '@emotion/styled'

import winKey from '../win_key.svg'

const Centered = styled.p`
    align-self: center;
    color: gray;
`;

const KeyImage = styled.img`
    width: 2ex;
    pointer-events: none;
`;

const Key = styled.kbd`
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 0 rgb(0 0 0 / 20%), 0 0 0 2px #fff inset;
    margin: 0 .1em;
    padding: .2em .2em;
    text-shadow: 0 1px 0 #fff;
    font-weight: bold;
    color: #333;
    min-width: 2ex;
    max-height: 2ex;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
`;

export function Helptip() {
    return <Centered>
        Press <Key><KeyImage src={winKey} alt="Win" /></Key>+<Key><span>/</span></Key> to toggle visibility of Findr.
    </Centered>;
}