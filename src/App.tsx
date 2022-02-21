import { useRef, MouseEvent } from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { appWindow } from '@tauri-apps/api/window'
import { SearchBar } from './components/SearchBar'
import { Results } from './components/Results'
import { Helptip } from './components/Helptip'

const Container = styled.div`
  --primary-color: #29B6F6;
  --background-color: #282c34b3;
  background: transparent;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  text-align: center;
  min-height: 100vh;
  padding: 0 25%;
  font-size: 2em;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;


function App() {
  const container = useRef(null);

  function hide(e: MouseEvent) {
    if (e.target !== container.current) return;
    if (e.button !== 0) return; 
    appWindow.hide();
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
    <Results />
    <Helptip />
  </Container>;
}

export default App
