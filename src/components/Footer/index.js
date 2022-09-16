import React, { useContext } from 'react';
import { ThemeContext } from '../../App';

import { Container } from './styles';

export default function Footer() {

  const {theme} = useContext(ThemeContext);
  const {onToggleTheme} = useContext(ThemeContext);

  return (
    <Container>
      <span>Theme Switch Blog</span>
      <button
       type="button" 
       onClick={onToggleTheme}
       >
        {theme === 'dark' ? '🌞' : '🌚'}
      </button>
    </Container>
  );
}