import React from 'react';
import {Link} from "react-router-dom";

const Header = props => {
  return (
    <header className='header'>
      <Link className='link' to='/'>Главная</Link>
      <Link className='link' to='/characters'>Персонажи</Link>
      <Link className='link' to='/locations'>Локации</Link>
      <Link className='link' to='/episodes'>Эпизоды</Link>
    </header>
  )
}
export {Header}
