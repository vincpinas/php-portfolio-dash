import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navItems, { navItem } from './navItems';
import Tooltip from '../Tooltip/Tooltip';
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
                <Tooltip text={item.title}>
                  <Link
                    to={item.path}
                    className={location.pathname.includes(item.path) ? `${item.className} active` : item.className}
                    children={<span>{item.icon}</span>}
                  />
                </Tooltip>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export default Navigation;
