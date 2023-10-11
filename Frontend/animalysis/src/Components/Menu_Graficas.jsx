import React from 'react'
import '../Styles/Menu_Graficas.css'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from "framer-motion";


//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faCat } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { faCrow } from '@fortawesome/free-solid-svg-icons'
import { faCow } from '@fortawesome/free-solid-svg-icons'
import { faBacteria } from '@fortawesome/free-solid-svg-icons'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
import { faSyringe } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'



function Menu_Graficas() {
    const [Tipos_Animales, setTipos_Animales] = useState(false);
    const [Condicion, setCondicion] = useState(false);
    const [edad, setEdad] = useState(false);
    const [colores, setColores] = useState(false);

    const [Razas, setRazas] = useState(false);
    const [Ingreso, setIngreso] = useState(false);


    const handleTipos_AnimalesClick = () => {
        setTipos_Animales(true);
        }
    
    const handleCondicionClick = () => {
        setCondicion(true);
        }
    const handleEdadClick = () => {
        setEdad(true);
        }
  
    const handleRazasClick = () => {
        setRazas(true);
        }
    const handleIngresoClick = () => {
        setIngreso(true);
        }
    const handleColoresClick = () => {
        setColores(true);
        }
    function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        colors.push(color);
    }
    return colors;
    }
    if (Tipos_Animales) {
        return <Navigate to="/Graficas/Tipos_Animales" replace />;
      }
    if (Condicion) {
        return <Navigate to="/Graficas/Condicion" replace />;
    }
    if (edad) {
        return <Navigate to="/Graficas/Edad" replace />;
    }
    if (Razas) {
        return <Navigate to="/Graficas/Razas" replace />;
    }
    if (Ingreso) {
        return <Navigate to="/Graficas/Ingreso" replace />;
    }
    if (colores) {
        return <Navigate to="/Graficas/Colores" replace />;
    }


  return (

    <div className='Fondo1'> 

        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='boton_atras'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <button  >
                    <a href='/' ><FontAwesomeIcon icon={faRotateLeft} style={{color: "#ff0f0f",}} /></a>

                </button>
        </motion.div>
      
        <div className='titulo1'>
            <h1 style={{ fontFamily: 'Bowling' ,}} ><FontAwesomeIcon icon={faChartPie} spinPulse style={{color: getRandomColors(800),}} /> Graficas</h1>
        </div>
       
        <div className='botones-container '>
        
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica1 '>
            <button  onClick={handleTipos_AnimalesClick}>
            <FontAwesomeIcon className='text-4xl  text-amber-900' icon={faCat}/>
            <FontAwesomeIcon className='text-4xl text-amber-900' icon={faDog}  />
            <FontAwesomeIcon  className='text-4xl text-amber-900' icon={faCrow} />
            <FontAwesomeIcon   className='text-4xl text-amber-900 ' icon={faCow}  />
                <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl text-amber-900'> Tipos de animal</h1>
            </button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica2'>
            <button onClick={handleCondicionClick}>
            <FontAwesomeIcon icon={faBacteria}   className='text-4xl '  style={{color: "#01fe7b",}} /> 
            <FontAwesomeIcon icon={faVirus}  className='text-4xl '  style={{color: "#01fe7b",}} />
            <FontAwesomeIcon icon={faSyringe}  className='text-4xl '  style={{color: "#01fe7b",}}/>
                <h1 style={{ fontFamily: 'Bowling',color: "#01fe7b"}} className='text-3xl'> Condición</h1>
            </button>
        </motion.div>
        
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica3'>
          
            <button   onClick={handleEdadClick}>
            <FontAwesomeIcon  className='text-4xl' icon={faCalendarDays} style={{color: "#3579ed",}} />
            <FontAwesomeIcon className='text-4xl' icon={faMagnifyingGlass}  style={{color: "#3579ed",}}/>
                <h1 style={{ fontFamily: 'Bowling',color: "#3579ed" }} className='text-3xl'> Edad Animales </h1>
            </button>
      
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica4'>
        <button onClick={handleRazasClick}>
            <FontAwesomeIcon icon={faPaw} className='text-4xl' style={{color: "#e5ba1f",}} />
            <h1 style={{ fontFamily: 'Bowling',color: "#e5ba1f" }} className='text-3xl'>  Raza </h1>
        </button>
      
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica5'>
        <button  onClick={handleIngresoClick}>
          <FontAwesomeIcon icon={faHandHoldingHeart} className='text-4xl' style={{color: "#ea061d",}} />
            <h1 style={{ fontFamily: 'Bowling',color: "#ea061d" }} className='text-3xl'> Situacion </h1>
        </button>
      
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }} className='contenedor_Grafica6'>
        <button onClick={handleColoresClick}>
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl' style={{color: "#f5ac0f",}} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ff0000" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#00ff00" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#0000ff" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ffff00" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ff00ff" }} />
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'> Colores </h1>
        </button>
        </motion.div>
     
        
        </div>
       
    </div>
  )
}

export default Menu_Graficas