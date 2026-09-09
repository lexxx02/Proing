import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CourseModules from './pages/CourseModules';
import Login from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'courses',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Navigate to="/courses" replace />,
      },
      {
        path: 'courses/:id',
        element: <CourseModules />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
