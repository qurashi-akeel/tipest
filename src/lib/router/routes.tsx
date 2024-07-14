import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import TypingPage from '../pages/typing';

const Home = React.lazy(() => import('~/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/typing',
    element: <TypingPage />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
