import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage';
import MainPage from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path="/game/:mode" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
