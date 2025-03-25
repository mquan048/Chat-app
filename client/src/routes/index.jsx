import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

export const routes = [
  {
    path: '/',
    component: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    component: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    component: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
];

export const navigateRoutes = [{ path: '*', navigatePath: '/' }];
