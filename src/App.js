import React, {useState, useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import CreateThemeContent from './CreateThemeContent';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import ThemeSelector from './ThemeSelector';
import Dialog from './Dialog';
//create a container

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {

  // get the selected theme, font list etc.
  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();

  useEffect(() => {
    setSelectedTheme(theme);
  },[themeLoaded]);

  // load all the fonts
  useEffect(() => {
    WebFont.load({
      google:{
      families:getFonts()
      }
    });
  });

  const manageDialog = () => {
    setShowDialog(!showDialog);
  }

  const createTheme = newTheme => {
    console.log(newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  }

  return (
    <>
    {
        themeLoaded && <ThemeProvider theme={selectedTheme } >
          <GlobalStyles/>
          <Container style={{fontFamily:selectedTheme.font}}>
            <h1>Theme Builder</h1>
            <p>
              This is a theming system with a Theme Switcher and Theme builder.

            </p>
            <button className="btn" onClick={ manageDialog }>Create a Theme</button>
          <Dialog 
            header="Create a Theme"
            body={ <CreateThemeContent create={ createTheme }/> }
            open={ showDialog } 
            callback = { manageDialog }/> 
          <ThemeSelector setter={ setSelectedTheme } newTheme={ newTheme } />
          </Container>
        </ThemeProvider>
    }
    </>
  );
}

export default App;
