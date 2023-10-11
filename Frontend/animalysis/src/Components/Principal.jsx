
import '../Styles/Principal.css'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Iconos
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { faCow } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faPersonRays } from '@fortawesome/free-solid-svg-icons';
import { faEgg } from '@fortawesome/free-solid-svg-icons';



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
        return <Navigate to="/creditos" replace />;
      }
  
    return (
      <div className='fondo'>

        <h1 className='titulo' style={{ fontFamily: 'Animalfont' }}> Animalysis
        </h1>
 
        <div className='icon-container'>
       <FontAwesomeIcon className='text-6xl ' icon={faCat} flip/>
       <FontAwesomeIcon className='text-6xl text-amber-900 ' icon={faDog} bounce />
       <FontAwesomeIcon  className='text-6xl text-lime-700' icon={faCrow} shake/>
       <FontAwesomeIcon   className='text-6xl text-teal-400' icon={faCow} fade />
       </div>

       
        <div className='boton_position'>

          <button className='boton boton_graficas boton_size_graficas' onClick={handleGraficasClick}style={{ fontFamily: 'Bowling' }}> <FontAwesomeIcon icon={faChartSimple} style={{color: "#000000",}} /> Graficas</button>
        </div>
        <div className='icon-container'>
          <FontAwesomeIcon className='text-6xl' icon={faEgg} style={{color: "#eae076",}} bounce />
          </div>
        <div className='boton_position'>
         
          <button className='boton boton_size_info boton_info'onClick={handleInfoClick} style={{ fontFamily: 'Bowling' }}> <FontAwesomeIcon icon={faPersonRays} style={{color: "#000000",}} /> ¿Quiénes somos?</button>
        </div>
      </div>
    );
  }
  
  export default Principal;