import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage';
import SuppliersPages from './features/SuppliersPages';
import PrivateRoutes from './components/PrivateRoutes';
import './scss/App.scss';


function App() {

  return (
      <Routes>
        
        {/* Redireccionar la raíz al login */}
        <Route path='/' element={<Navigate to='/login' replace />} />

        {/* Rutas públicas */}
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/main' element={<MainPage />} />


        {/* Rutas protegidas: solo accesibles si el usuario está autenticado */}
        <Route element={<PrivateRoutes />}>
          <Route path='/suppliers' element={<SuppliersPages />}/>
        </Route>
        
      </Routes>
  )
}

export default App
