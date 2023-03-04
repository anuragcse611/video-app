import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Host from './Components/Host';
import './App.css';
import Participants from './Components/Participants';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Host/>}/>
        <Route exact path="/participants" element={<Participants/>}/>
      </Routes>
    </Router>
  );
}




export default App;
