import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks.js';
import SignIn from './Containers/SignIn/SignIn.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.jsx';

const App = () => {
  const { user } = useAppSelector(state => state.user);

  const publicPages = () => (
    <>
      <Route path='/sign-in' element={<SignIn />} />
    </>
  );

  const privatePages = () => (
    <>
      <Route path='/cards' element={<></>} />
    </>
  );

  return (
    <>
      <Notifications />
      {user && <Sidebar />}
      <Routes>
        <Route
          path='*'
          element={<Navigate to={user ? '/cards' : '/sign-in'} />}
        />
        {user ? privatePages() : publicPages()}
      </Routes>
    </>
  );
};

export default App;
