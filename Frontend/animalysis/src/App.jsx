import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Principal from './Components/Principal';
import Menu_Graficas from './Components/Menu_Graficas';
import Tipos_Animales from './Components/Graficas/Tipos_Animales';
import Condicion_Admision from './Components/Graficas/Condicion_Admision';
import Edad from './Components/Graficas/Edad';
import Raza from './Components/Graficas/Raza';
import Situacion from './Components/Graficas/Situacion';
import Color from './Components/Graficas/Colores';


function App() {
  
  return (
    <div>
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<Principal />} exact ></Route>
     <Route path="*" element={<Navigate to="/" replace />} />
     <Route path="/Graficas" element={<Menu_Graficas />} exact ></Route>
      <Route path="/Graficas/Tipos_Animales" element={<Tipos_Animales />} exact ></Route>
      <Route path="/Graficas/Condicion" element={<Condicion_Admision />} exact ></Route>
      <Route path="/Graficas/Edad" element={<Edad />} exact ></Route>
      <Route path="/Graficas/Razas" element={<Raza />} exact ></Route>
      <Route path="/Graficas/Ingreso" element={<Situacion />} exact ></Route>
      <Route path="/Graficas/Colores" element={<Color />} exact ></Route>
    
     </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;



