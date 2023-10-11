import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'


import '../Styles/creditos.css'

function creditos() {
  return (
    <div className='fondo9'>
        
        <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className='boton_atras1'
        style={{ display: 'flex', alignItems: 'center' }}
        >
        <button style={{ pointerEvents: 'auto', zIndex: 1 }}>
            <a href='/' className='text-2xl ml-4' >
            <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#ff0f0f" }} />
            </a>
        </button>
        </motion.div>
        <div className='principal'>
            <h1 className='tituloc '  style={{ fontFamily: 'Animalfont' }} >¿Quienes somos?</h1>
         
            <img src={require('../Images/Galloz.png')}  />
            <p className='parrafo'>
            Galloz es una empresa innovadora especializada en la creación de juegos, desarrollo de páginas web y análisis de datos. Este proyecto de la compañía fue realizado por Rubens Andre Apresa Echeverria, Luis Espinel Luna y Fernando Valencia. Galloz se destaca por su enfoque en la diversión y el entretenimiento a través de juegos, así como por su capacidad para diseñar sitios web impactantes y proporcionar análisis de datos perspicaces.
            </p>
        </div>
    </div>
  )
}

export default creditos