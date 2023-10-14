import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie , Bar} from 'react-chartjs-2';
import '../../Styles/raza.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';



function Raza() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar'); 
  const [zoomLevel, setZoomLevel] = useState(8000); 
  const [minimo, setMinimo] = useState(100); 

  useEffect(() => {
    
    axios.get(`/api/animals/Animal_type_with_Breed?Animal_Type=${selectedAnimalType}`).then((response) => {
      setData(response.data);
    });
  }, [selectedAnimalType]);


  const topBreeds = data
    .sort((a, b) => b.count - a.count) 
    .slice(0, minimo); 


  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }

  const handleAnimalTypeChange = (event) => {
    setSelectedAnimalType(event.target.value);
  };

  const handleChartTypeBar = (event) => {
      
      setSelectedChartType('bar');
    }
  const handleChartTypePie = (event) => {
      
      setSelectedChartType('pie');
    }
    const updateZoom = (newZoomLevel) => {
      setZoomLevel(newZoomLevel);
    };
    const updateMinimo = (newMinimo) => {
      setMinimo(newMinimo);
    }
  return (
    <div className='Fondo5'>
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
      <div className='contenedor_principal3'>
      <div className='contenedor_botones3'>
      <h1 className='  text-2xl p-2' >
      <FontAwesomeIcon icon={faPaw} className='text-4xl' style={{color: "#e5ba1f",}} />
         </h1>
      <label htmlFor="animalType" className='rounded-lg shadow-lg   bg-white p-2 text-2xl'>Selecciona un Tipo de Animal:</label>
        <select
          id="animalType"
          onChange={handleAnimalTypeChange}
          value={selectedAnimalType}
          className='select4'
        >
       
          <option value='Dog'>Perro</option>
          <option value='Cat'>Gato</option>
          <option value='Livestock'>Ganaderos</option>
          <option value='Bird'>Pajaros</option>
          <option value='Other'>Otro</option>
        </select>
        <label  className='rounded-lg  bg-white p-2 text-2xl' htmlFor="chartType">Selecciona un Tipo de Gráfico:</label>
          <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title4' >
           <button onClick={handleChartTypeBar}><FontAwesomeIcon className='text-6xl text-blue-600' icon={faChartColumn}  shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title4' >
        <button onClick={handleChartTypePie}><FontAwesomeIcon  className='text-6xl text-purple-600' icon={faChartPie}shake /></button>
        </motion.div>
      </div>
      <div className='contenedor_grafica3'>
      <h2 className='titulo2'>Tipos de animales por Razas</h2>
        {selectedChartType === 'bar' ? (
          <div>
            <label htmlFor='zoomLevel' className='titulo3'> Limite : </label>
              <input className='titulo4 textField3'
              type='number'
              id='zoomLevel'
              value={zoomLevel}
              onChange={(e) => updateZoom(Number(e.target.value))}
            />
          </div>
        ) : (
          <h3 className='titulo3'>Gráfico de Torta</h3>
        ) }
        <div>
          <input className='titulo4 textField3'
                type='number'
                id='minimum'
                value={minimo}
                onChange={(e) => updateMinimo(Number(e.target.value))}
              />

           </div>
          {selectedChartType === 'bar' ? (
              <Bar data={
                { labels: topBreeds.map((item) => item.Breed), 
              datasets: [
                {
                  data: topBreeds.map((item) => item.count), 
                  backgroundColor: getRandomColors(topBreeds.length),
                },
              ],}} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: zoomLevel,
                  },
                },
              }}
              />
          ) : (
            <Pie data={{ 
              labels: topBreeds.map((item) => item.Breed), 
              datasets: [
                {
                  data: topBreeds.map((item) => item.count), 
                  backgroundColor: getRandomColors(topBreeds.length), 
                },
              ]
            }} />
          )
          }
        
      
      </div>
      </div>
    </div>
  );
}

export default Raza;
