import styled from '@emotion/styled'
import { listen } from '@tauri-apps/api/event';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';


const Container = styled.div`
    margin-top: 15vh;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    background: #282c34;
    display: flex;
    align-items: center;
`;

const SearchIcon = styled(BsSearch)`
    padding: 0 0.4em;
    color: gray;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    background: none;
    border-bottom: 1px solid grey;
    margin: 0 0.3em 0 0;
    outline: none;
    font-size: 1em;
    color: white;
    font-family: inherit;

    transition: border-bottom-color 0.2s ease;

    &:focus {
        border-bottom: 1px solid var(--primary-color);
    }

    &::placeholder {
        color: gray;
    }
`;


export function SearchBar() {
    const [text, setText] = useState("");
    const element = useRef<HTMLInputElement>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    useEffect(() => {
        const whenUnlisten = listen("tauri://focus", e => {
            console.log("Focus gained, cleaning input text")
            setText("");
            if (element.current === null) return;
            element.current.focus();
        });
        return () => {
            whenUnlisten.then((unlisten) => unlisten());
        }
    }, []);
    
    return <Container>
        <SearchIcon />
        <Input 
            ref={element} 
            type="text" 
            placeholder='Search...' 
            value={text} 
            onChange={handleChange} 
            autoFocus
        />
    </Container>;
}