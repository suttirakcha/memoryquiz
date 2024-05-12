import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage';
import MainPage from './pages/Main';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />}/>
        <Route path='/' element={<MainPage />}/>
        <Route path="/game/:mode" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
