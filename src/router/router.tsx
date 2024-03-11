import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-out",
    element: <SignOut />,
  },
]);

export default router