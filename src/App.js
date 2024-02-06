import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './app/pages/Login';
import Signup from './app/pages/Signup';
import Dashboard from './app/pages/Dashboard';

import useToken from './app/services/use_token';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />}>
          </Route>
          <Route path="/signup" element={<Signup />}>
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
