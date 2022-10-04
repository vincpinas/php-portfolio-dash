import { ReactElement } from 'react';
import { AiOutlineFundProjectionScreen, AiOutlineUser } from 'react-icons/ai';
import { GoFileMedia } from 'react-icons/go';

export interface navItem {
  title: string;
  path: string;
  icon: ReactElement;
  className: string;
}

const navItems: navItem[] = [
  {
    title: 'Projects',
    path: '/projects',
    icon: <AiOutlineFundProjectionScreen />,
    className: 'nav-text'
  },
  {
    title: 'User',
    path: '/user',
    icon: <AiOutlineUser />,
    className: 'nav-text'
  },
  {
    title: 'Media',
    path: '/media',
    icon: <GoFileMedia />,
    className: 'nav-text'
  },
];

export default navItems;