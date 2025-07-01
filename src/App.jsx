import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks.js';
import SignIn from './Containers/SignIn/SignIn.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import ContentHeader from './Components/ContentHeader/ContentHeader.jsx';
import Cards from './Containers/Cards/Cards.jsx';
import CardsReportByEmployees from './Containers/CardsReportByEmployees/CardsReportByEmployees.jsx';
import Employees from './Containers/Employees/Employees.jsx';
import './App.css';

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
      <Route path='/stats_by_employees' element={<CardsReportByEmployees />} />
      {user && user.role === 'admin' && adminPages()}
    </>
  );

  const adminPages = () => (
    <>
      <Route path='/employees' element={<Employees />} />
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
