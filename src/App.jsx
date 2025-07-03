import {Navigate, Route, Routes} from 'react-router-dom';
import { useAppSelector } from './app/hooks.js';
import SignIn from './Containers/SignIn/SignIn.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import ContentHeader from './Components/ContentHeader/ContentHeader.jsx';
import Cards from './Containers/Cards/Cards.jsx';
import CardsReportByEmployees from './Containers/CardsReportByEmployees/CardsReportByEmployees.jsx';
import Employees from './Containers/Employees/Employees.jsx';
import './App.css';
import CardsReportByReasons from "./Containers/CardsReportByReasons/CardsReportByReasons.jsx";
import CardsReportBySolution from "./Containers/CardsReportBySolution/CardsReportBySolution.jsx";
import CardsReportByRepeatedCalls from "./Containers/CardsReportByRepeatedCalls/CardsReportByRepeatedCalls.jsx";
import CardsReportByInactiveUsers from "./Containers/CardsReportByInactiveUsers/CardsReportByInactiveUsers.jsx";
import ReasonsAndSolutions from "./Containers/ReasonsAndSolutions/ReasonsAndSolutions.jsx";

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
      <Route path='/stats_by_reasons' element={<CardsReportByReasons />} />
      <Route path='/stats_by_solutions' element={<CardsReportBySolution />} />
      <Route path='/stats_by_repeated_calls' element={<CardsReportByRepeatedCalls />} />
      <Route path='/stats_by_inactives_users' element={<CardsReportByInactiveUsers />} />
      <Route path='/actions_tree' element={<ReasonsAndSolutions />} />
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
