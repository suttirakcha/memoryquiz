import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePage from './pages/GamePage';
import MainPage from './pages/Main';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/404' element={<NotFound />}/>
        <Route path='/' element={<MainPage />}/>
        <Route path="/game/:mode" element={<GamePage />}/>
        <Route path='/:lang' element={<MainPage />}/>
        <Route path="/:lang/game/:mode" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
