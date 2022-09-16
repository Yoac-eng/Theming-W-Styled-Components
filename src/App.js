import React, { useState, useMemo, createContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

import themes from './styles/themes/'

//Context to send currentTheme and toggleTheme function to child components
export const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useLocalState('dark');

  const currentTheme = useMemo(() => {
    return themes[theme] || themes.dark;
  }, [theme]);

  function handleToggleTheme() {
    setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
  }

  //Custom hook to keep the state saved on the local storage
  function useLocalState(key, initialValue = ''){
    const [state, setState] = useState(() =>{
      const storedData = localStorage.getItem(key);

      if (storedData){
        return JSON.parse(storedData);
      }

      return initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state])

    return [state, setState]
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
        <ThemeContext.Provider
          value={{
            theme,
            onToggleTheme: handleToggleTheme,
            }}>
          <Layout/>
        </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
