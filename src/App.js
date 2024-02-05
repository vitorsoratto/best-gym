import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './app/pages/Login';
import Signup from './app/pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
