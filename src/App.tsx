import './App.css';
import Home from './Components/Home/Home';
import { UserState } from './Components/contexts/UserState';

function App() {
  return (
    <UserState>
          <div className="App">
            <Home/>
          </div>
    </UserState>
    
  );
}

export default App;
