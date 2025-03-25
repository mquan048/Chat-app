import { Routes, Route, Navigate } from 'react-router';
import { routes, navigateRoutes } from './routes';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/NavBar';

import './App.css';

const App = () => {
  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={Page} />;
        })}
        {navigateRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<Navigate to={route.navigatePath} />}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
