import styled from '@emotion/styled'
import { appWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import Select, { SelectInstance, Props, components, ControlProps, OptionProps, InputProps } from 'react-select';
import { baseElementEvents, Depths, Icon } from '@fluentui/react';
import {getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';
import { BsSearch } from 'react-icons/bs';

import { Helptip } from './Helptip';


interface Option {
    value: string,
    label: string,
    extension: string,
}

const SearchContainer = forwardRef((props: Props<Option, false>, ref: ForwardedRef<SelectInstance<Option>>) => (
    <Select<Option> ref={ref} {...props} />
));

const Control = ({children, isFocused, ...props}: ControlProps<Option, false>) => (
    <components.Control isFocused {...props}><SearchIcon/>{children}</components.Control>
);

const Input = ({autoFocus, ...props}: InputProps<Option, false>) => (
    <components.Input autoFocus {...props}/>
);

const Result = ({children, data, ...props}: OptionProps<Option, false>) => {
    return <components.Option data={data} {...props}><ResultIcon {...getFileTypeIconProps({extension: data.extension})}/>{children}</components.Option>;
};

const Container = styled.div`
    width: 100%;
    border-radius: 0.5em;
    box-sizing: border-box;
    background: var(--background-main);
    box-shadow: ${Depths.depth8};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Findr = styled(SearchContainer)`
    width: 100%;
    border: none;
    border-radius: 0;
    background: none;

    .Findr__indicators {
        display: none;
    }

    .Findr__control {
        margin: 0.2em;
        padding: 0em;
        background: var(--background-light);
        border: solid;
        border-width: 1px;
        border-color: var(--background-light);
        border-radius: 0.5em;
        box-shadow: ${Depths.depth4};

        :hover {
            border-color: var(--text-background);
        }

        &--is-focused, &--is-focused:hover {
            border-color: var(--accent-main);
        }
    }

    .Findr__value-container {
        padding: 0.1em;
        padding-right: 0.5em;
        text-align: left;
    }

    .Findr__placeholder {
        color: var(--text-background);
    }

    .Findr__single-value {
        color: var(--text-main);
    }

    .Findr__input-container {
        padding: 0;
        color: var(--text-main);
    }

    .Findr__menu {
        position: initial;
        margin: 0;
        background: initial;
        border-radius: initial;
        border: initial;
        box-shadow: initial;
        text-align: initial;
    }

    .Findr__menu-list {
        padding: 0;
        max-height: 60vh;
    }

    .Findr__option {
        display: flex;
        align-items: center;
        padding: 0.2em 0.2em;
        &--is-focused, &--is-selected {
            background: var(--accent-main);
        }
    }

    .Findr__menu-notice {
        padding: 0em 1em;
        text-align: initial;
    }
`;

const SearchIcon = styled(BsSearch)`
    margin: 0 0.3em;
`;

const ResultIcon = styled(Icon)`
    padding: 0 0.4em;
    height: 1.1em;
    width: 1.1em;
`;

const results: Option[] = [
    {value: "1", label: "Test.pdf", extension: 'pdf'},
    {value: "2", label: "image.jpg", extension: 'jpg'},
    {value: "3", label: "saucisse.png", extension: 'png'},
    {value: "4", label: "file.py", extension: 'py'},
];

export function SearchBar() {
    const element = useRef<SelectInstance<Option> | null>(null);

    function focus() {
        if (element.current === null) return;
        element.current.clearValue();
        console.log("CLEARED VALUE");
        element.current.focus();
        element.current.forceUpdate();
        console.log(element.current);
    }

    useEffect(() => {
        const whenUnlisten = listen("tauri://focus", e => {
            console.log(`focused gained: ${e.event}`);
            focus();
        });

        const whenUnlisten2 = appWindow.listen("focused", e => {
            console.log(`rust called focus: ${e.event}`);
            focus();
        })

        return () => {
            whenUnlisten.then((unlisten) => unlisten());
            whenUnlisten2.then((unlisten) => unlisten());
        }
    });

    return <Container>
        <Findr
            components={{Control, Option: Result, Input}}
            ref={element}
            classNamePrefix='Findr'
            placeholder='Search...'
            options={results}
            noOptionsMessage={() => "No matching results"}
            escapeClearsValue
            isClearable
            defaultMenuIsOpen
            menuIsOpen
        />
        <Helptip/>
    </Container>;
}