import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage';
import './scss/App.scss';
import 'animate.css';
import SuppliersPage from './features/SuppliersPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} /> {/** Redireccionar a Login */}
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/main' element={<MainPage />} />
        <Route path='/suppliers' element={<SuppliersPage />}/>
      </Routes>
    </Router>
  )
}

export default App
