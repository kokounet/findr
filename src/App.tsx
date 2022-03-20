import { useRef, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { appWindow } from '@tauri-apps/api/window';

import { SearchBar } from './components/SearchBar';

const Container = styled.div`
  --accent-main: #29B6F6;
  --background-main: #282c34;
  --background-light: #414752;
  --background-dark: #282c34;
  --text-main: white;
  --text-background: #a0a0a0;
  background: transparent;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  text-align: center;
  height: 70vh;
  padding: 15vh 25%;
  font-size: 1.5em;
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;


export function App() {
  const container = useRef(null);

  async function hide(e: MouseEvent) {
    if (e.target !== container.current) return;
    if (e.button !== 0) return; 
    await appWindow.hide();
  }
  return <Container ref={container} onMouseDown={hide}>
    <Global
      styles={css`
        body {
          margin: 0;
        }
      `}
    />
    <SearchBar />
  </Container>;
}
