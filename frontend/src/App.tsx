import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage';
import SuppliersPages from './features/SuppliersPages';
import PrivateRoutes from './components/PrivateRoutes';
import './scss/App.scss';
import 'animate.css';


function App() {

  return (
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} /> {/** Redireccionar a Login */}
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/main' element={<MainPage />} />


        {/* Rutas protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route path='/suppliers' element={<SuppliersPages />}/>
        </Route>
        
      </Routes>
  )
}

export default App
