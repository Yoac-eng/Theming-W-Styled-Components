import React, { useContext } from 'react';
import { ThemeContext } from '../../App';

import { Container } from './styles';

export default function Header() {

  const {theme} = useContext(ThemeContext);
  const {onToggleTheme} = useContext(ThemeContext);

  return (
    <Container>
      <h1>Click on the icon to toggle theme {"=>"}</h1>
      <button
       type="button" 
       onClick={onToggleTheme}
       >
        {theme === 'dark' ? '🌞' : '🌚'}
      </button>
    </Container>
  );
}