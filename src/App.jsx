import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks.js';
import SignIn from './Containers/SignIn/SignIn.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import ContentHeader from './Components/ContentHeader/ContentHeader.jsx';
import Cards from './Containers/Cards/Cards.jsx';

const App = () => {
  const { user } = useAppSelector(state => state.user);

  const publicPages = () => (
    <>
      <Route path='/sign-in' element={<SignIn />} />
    </>
  );

  const privatePages = () => (
    <>
      <Route path='/cards' element={<Cards />} />
    </>
  );

  return (
    <>
      <Notifications />
      <div className='content-wrapper'>
        {user && <Sidebar />}
        {user && <ContentHeader />}
        <Routes>
          <Route
            path='*'
            element={<Navigate to={user ? '/cards' : '/sign-in'} />}
          />
          {user ? privatePages() : publicPages()}
        </Routes>
      </div>
    </>
  );
};

export default App;
