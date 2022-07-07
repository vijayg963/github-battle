import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='navigation-bar'>
      <nav className='menus w-100 flex-row-center'>
        <NavLink to='/' activeClassName='active-menu' exact>
          Popular
        </NavLink>
        <NavLink to='/battle' activeClassName='active-menu'>
          Battle
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
