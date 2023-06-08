import React from 'react';
import {Link} from "react-router-dom";

const Header = props => {
  return (
    <header>
      <Link to='/'>Главная</Link>
      <Link to='/characters'>Персонажи</Link>
      <Link to='/locations'>Локации</Link>
      <Link to='/episodes'>Эпизоды</Link>
    </header>
  )
}
export {Header}
