import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navItems, { navItem } from './navItems';
import './Navigation.scss';

function Navigation() {
  const location = useLocation();
  return (
    <div id='navigationComponent'>
      <ul>
        {
          navItems.map((item: navItem, index: number) => {
              return (
                <li key={`nav-item-id:${index}`}>
                  <Link 
                    to={item.path}
                    className={location.pathname.includes(item.path) ? `${item.className} active` : item.className}
                    children={<span>{item.icon}</span>}
                  />
                </li>
              );
          })
        }
      </ul>
    </div>
  )
}

export default Navigation;
