import {Navigate, Routes} from "react-router-dom";
import {useAppSelector} from "./app/hooks.js";
import './App.css';

const App = () => {
  const {user} = useAppSelector(state => state.user);

  return (<>
    <Routes>
      <Route
        path="*"
        element={<Navigate to={user ? '/cards' : '/sign-in'}/>}
      />
    </Routes>
  </>)
}

export default App
