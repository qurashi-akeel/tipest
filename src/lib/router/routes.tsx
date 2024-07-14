import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import TypingTimer from '../pages/typing';

const Home = React.lazy(() => import('~/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/typing',
    element: <TypingTimer />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
