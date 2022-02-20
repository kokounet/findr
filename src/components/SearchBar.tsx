import styled from '@emotion/styled'
import { listen } from '@tauri-apps/api/event';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 2px solid grey;
    box-sizing: border-box;
    background: #282c34;
    border-radius: 10px;
    padding: 0.1em 0.3em;
    outline: none;
    font-size: 1em;
    color: white;

    font-family: inherit;

    &:focus {
        border-bottom: 2px solid var(--primary-color);
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
    
    return <Input 
        ref={element} 
        type="text" 
        placeholder='Search...' 
        value={text} 
        onChange={handleChange} 
        autoFocus
    />;
}