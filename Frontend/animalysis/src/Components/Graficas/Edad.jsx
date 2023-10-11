import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import '../../Styles/Edad.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';

import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';




function Edad() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar'); 
  const [zoomLevel, setZoomLevel] = useState(8000); // Estado para el nivel de zoom
// cambiar minimo 
  const [minimo, setMinimo] = useState(600); // Estado para el nivel de zoom

  useEffect(() => {
    // Hacer una solicitud Axios para obtener los datos necesarios desde tu servidor
    axios.get(`/api/animals/Animal_type_with_Age_upon_Intake?Animal_Type=${selectedAnimalType}`).then((response) => {
      setData(response.data);
    });
  }, [selectedAnimalType]);

  // Función para manejar el cambio en el tipo de gráfico seleccionado
  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  const updateZoom = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };
  const updateMinimo = (newMinimo) => {
    setMinimo(newMinimo);
  }
  const handleChartTypeBar = (event) => {

    setSelectedChartType('bar');
  }
  const handleChartTypePie = (event) => {
      
      setSelectedChartType('pie');
    }
  const handleChartTypeRadar = (event) => {
    
    setSelectedChartType('radar');
  }
  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }

  // Filtrar los datos para limitar la cantidad a 100 o menos
  const filteredData = data.filter((item) => item.count >= minimo);

  return (
    <div className='Fondo4'>
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className='boton_atras1'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <button style={{ pointerEvents: 'auto', zIndex: 1 }}>
          <a href='/Graficas' className='text-2xl ml-4' >
            <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#ff0f0f" }} />
          </a>
        </button>
      </motion.div>
      <div className='contenedor_principal2'>
        <div className='contenedor_botones2'>
          <h1>
          <FontAwesomeIcon  className='text-4xl' icon={faCalendarDays} style={{color: "#3579ed",}} />
            <FontAwesomeIcon className='text-4xl' icon={faMagnifyingGlass}  style={{color: "#3579ed",}} />
          </h1>
          <label htmlFor="animalType" className='rounded-lg shadow-lg   bg-white p-2 text-2xl'>Selecciona un Tipo de Animal:</label>
          <select
            id="animalType"
            onChange={(event) => setSelectedAnimalType(event.target.value)}
            value={selectedAnimalType}
            className='select2'
          >
            <option value="">Todos</option>
            <option value="Dog">Perro</option>
            <option value="Cat">Gato</option>
            <option value="Bird">Pajaros</option>
            <option value="Livestock">Ganaderia</option>
            <option value="Other">Otros</option>
            {/* Agrega más opciones según tus datos */}
          </select>
          <label  className='rounded-lg  bg-white p-2 text-2xl' htmlFor="chartType">Selecciona un Tipo de Gráfico:</label>
          <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title4' >
           <button onClick={handleChartTypeBar}><FontAwesomeIcon className='text-6xl text-blue-600' icon={faChartColumn}  shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title4' >
        <button onClick={handleChartTypePie}><FontAwesomeIcon  className='text-6xl text-purple-600' icon={faChartPie}shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title4' >
        <button onClick={handleChartTypeRadar}><FontAwesomeIcon  className='text-6xl text-yellow-500' icon={faSatelliteDish} shake /></button>
        </motion.div>
        </div>
        <div className='contenedor_grafica2'>
          <h2 className='titulo2'>Tipos de animales por Edad</h2>
          {selectedChartType === 'bar' ? (
            <div>
              <label htmlFor='zoomLevel' className='titulo2'> Limite : </label>
              <input className='titulo3 textField2'
                type='number'
                id='zoomLevel'
                value={zoomLevel}
                onChange={(e) => updateZoom(Number(e.target.value))}
              />
            </div>
          ) : selectedChartType === 'pie' ? (
            <h3 className='titulo3'>Gráfico de Torta</h3>
          ) : (
            <h3 className='titulo3'>Gráfico Radar</h3>
          )}
           <h2 className='titulo2'>Minimo de datos:</h2>
           <div>
           <input className='titulo3 textField2'
                type='number'
                id='minimum'
                value={minimo}
                onChange={(e) => updateMinimo(Number(e.target.value))}
              />

           </div>
    
          {selectedChartType === 'bar' ? (
            <Bar data={{
              labels: filteredData.map((item) => item.Age_upon_Intake), // Edad en el eje X
              datasets: [
                {
                  label: 'Cantidad de animales',
                  data: filteredData.map((item) => item.count),
                  backgroundColor: getRandomColors(filteredData.length)
                },
              ]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: zoomLevel, // Ajusta la escala Y en función del zoom
                },
              },
            }}
           
            />
          ) : selectedChartType === 'pie' ? (
            <Pie data={{
              labels: filteredData.map((item) => item.Age_upon_Intake),
              datasets: [
                {
                  data: filteredData.map((item) => item.count),
                  backgroundColor: getRandomColors(filteredData.length),
                },
              ],
            }
            }
            />
          ) : (
            <Radar data={{ labels: filteredData.map((item) => item.Age_upon_Intake),
              datasets: [
                {
                  label: 'Cantidad de animales',
                  data: filteredData.map((item) => item.count),
                  backgroundColor: getRandomColors(filteredData.length),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ]
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Edad;
