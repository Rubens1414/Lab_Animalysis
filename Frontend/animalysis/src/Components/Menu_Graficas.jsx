import React from 'react'
import '../Styles/Menu_Graficas.css'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

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

    <div className='Fondo'> 
        <div className='titulo'>
            <h1 style={{ fontFamily: 'Bowling' }} >Graficas</h1>
        </div>
        <div className='botones-container '>
        <button className='contenedor_Grafica1' onClick={handleTipos_AnimalesClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'>Tipos de animal</h1>
        </button>
        <button className='contenedor_Grafica1' onClick={handleCondicionClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'> Condición </h1>
        </button>
        <button className='contenedor_Grafica1'  onClick={handleEdadClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'> Edad Animales </h1>
        </button>
      
        <button className='contenedor_Grafica1' onClick={handleRazasClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'>  Raza </h1>
        </button>
        <button className='contenedor_Grafica1' onClick={handleIngresoClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'> Situacion </h1>
        </button>
        <button className='contenedor_Grafica1' onClick={handleColoresClick}>
            <h1 style={{ fontFamily: 'Bowling' }} className='text-3xl'> Colores </h1>
        </button>
        
        </div>
       
    </div>
  )
}

export default Menu_Graficas