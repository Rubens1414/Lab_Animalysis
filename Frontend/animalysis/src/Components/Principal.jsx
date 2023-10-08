
import '../Styles/Principal.css'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';


function Principal() {
    const [Gografica, setGografica] = useState(false);
    const [Info, setInfo] = useState(false);
  
    const handleGraficasClick = () => {
      setGografica(true);
    };
    const handleInfoClick = () => {
        setInfo(true);
        }

    if (Gografica) {
      return <Navigate to="/Graficas" replace />;
    }
    if (Info) {
        return <Navigate to="/Info" replace />;
      }
  
    return (
      <div className='fondo'>
        <h1 className='titulo' style={{ fontFamily: 'Animalfont' }}> Animalysis</h1>
        <div className='boton_position'>
          <button className='boton boton_graficas boton_size_graficas' onClick={handleGraficasClick}style={{ fontFamily: 'Bowling' }}>Graficas</button>
        </div>
        <div className='boton_position'>
          <button className='boton boton_size_info boton_info'onClick={handleInfoClick} style={{ fontFamily: 'Bowling' }}>¿Quiénes somos?</button>
        </div>
      </div>
    );
  }
  
  export default Principal;