import { useCallback, useEffect, useMemo } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import { themes } from './styles/theme'

const DebugFooter = styled.footer`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  position: absolute;
  color: black;
  background-color: red;
  bottom: 0;
`

const Main = styled.main`
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 0, 0, 0.15);
`

function App(): React.JSX.Element {
  const radiusApi = useMemo(() => window.radiusApi, [])

  const handleKeyDown = useCallback((e) => {
    console.log(e)
  }, [])
  const handleKeyUp = useCallback((e) => {
    console.log(e)
  }, [])

  useEffect(() => {
    console.log('adding handlers')
    radiusApi.onKeyDown(handleKeyDown)
    radiusApi.onKeyUp(handleKeyUp)
  }, [handleKeyDown, handleKeyUp, radiusApi])

  return (
    <ThemeProvider theme={themes.Dark}>
      <Main></Main>
      <DebugFooter>
        <p>Radius running</p>
      </DebugFooter>
    </ThemeProvider>
  )
}

export default App
