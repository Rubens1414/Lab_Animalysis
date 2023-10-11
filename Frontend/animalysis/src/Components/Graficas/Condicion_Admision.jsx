import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Radar } from 'react-chartjs-2';
import '../../Styles/condicion.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faBacteria } from '@fortawesome/free-solid-svg-icons';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { faSyringe } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

function Condicion_Admision() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [AnimalType, setAnimalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('pie'); // Inicialmente, se establece en 'pie'

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAnimalType) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/animals/Animal_type_with_Intake_Condition?Animal_Type=${selectedAnimalType}`);
           
          if (selectedAnimalType === 'Dog') {
            setAnimalType('Perros');
          } else if (selectedAnimalType === 'Cat') {
            setAnimalType('Gatos');
          }
          else if (selectedAnimalType === 'Livestock') {
            setAnimalType('Ganaderos');
          }
          else if (selectedAnimalType === 'Bird') {
            setAnimalType('Pajaros');
          }
          else if (selectedAnimalType === 'Other') {
            setAnimalType('Otros');
          }

          setData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedAnimalType, AnimalType]);
 
  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }
  return (
    <div className='Fondo3'>
      <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.2 }}
      className='boton_atras2'
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <button style={{ pointerEvents: 'auto', zIndex: 1 }}>
        <a href='/Graficas' className='text-2xl ml-4' >
          <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#ff0f0f" }} />
        </a>
      </button>
    </motion.div>
      <div className='contenedor_principal1'>

    
      <div className='contenedor_botones1'>
      <h1 className='  text-2xl p-2' >
      <FontAwesomeIcon icon={faBacteria}   className='text-4xl '  style={{color: "#dd131d",}} /> 
            <FontAwesomeIcon icon={faVirus}  className='text-4xl '  style={{color: "#dd131d",}} />
            <FontAwesomeIcon icon={faSyringe}  className='text-4xl '  style={{color: "#dd131d",}}/>
         </h1>
      
      <h1 className=' rounded-lg shadow-lg  bg-white p-2 text-2xl' >Tipo de Animal:</h1>
        <select
          id='animalType'
          className='select2'
          onChange={(e) => setSelectedAnimalType(e.target.value)}
          value={selectedAnimalType}
        >
          <option value=''>Seleccionar el Tipo de Animal</option>
          <option value='Dog'>Perro</option>
          <option value='Cat'>Gato</option>
          <option value='Livestock'>Ganaderos</option>
          <option value='Bird'>Pajaros</option>
          <option value='Other'>Otro</option>
          {/* Agrega más opciones de Animal_Type según tus datos */}
        </select>
        <h1 className=' rounded-lg shadow-lg  bg-white p-2 text-2xl' >Tipo de Grafico:</h1>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='rounded-full
  
  shadow-lg border-2 border-red-200 shadow-red-500/50 p-10 bg-white mx-10 mb-8' >
        <button onClick={() => setChartType('pie')}><FontAwesomeIcon className='text-6xl text-green-500' icon={faChartPie}  shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='rounded-full
  
  shadow-lg border-2 border-red-200 shadow-red-500/50 p-10 bg-white mx-10 mb-8' >
       <button onClick={() => setChartType('radar')}><FontAwesomeIcon className='text-6xl text-green-500'  icon={faSatelliteDish} shake /></button>
        </motion.div>

      </div>

      {loading ? (
        <div className='contenedor_grafica1'>
          <p>Cargando datos...</p>
        </div>
      ) : data.length > 0 ? (
        <div className='contenedor_grafica1'>
          <h2 className='titulo3'> Tipo de condicion en {AnimalType}</h2>
          
          {chartType === 'pie' ? (
            <Pie
              data={{
                labels: data.map((item) => item.Intake_Condition),
                datasets: [{ label: 'Cantidad', data: data.map((item) => item.count) }],
                backgroundColor: getRandomColors(data.length),
              }}
              width={600}
              height={200}
            />
          ) : chartType === 'radar' ? (

            <Radar
            data={{
              labels: data.map((item) => item.Intake_Condition),
              datasets: [{ label: 'Cantidad', data: data.map((item) => item.count) }],
              backgroundColor: getRandomColors(data.length),
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,    
                  max: 10, 
                },
              },
            }}
            width={600}
            height={200}
          />
          ) : null}
        </div>
      ) : (
        <div className='contenedor_grafica1'>
          <p className='no-datos'>No se encontraron datos para el tipo de animal seleccionado.</p>
        </div>
      )}
        </div>
    </div>
  );
}

export default Condicion_Admision;
