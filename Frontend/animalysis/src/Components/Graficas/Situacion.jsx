import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import '../../Styles/situacion.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

function Situacion() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [zoomLevel, setZoomLevel] = useState(8000);
  useEffect(() => {
  
    axios.get(`/api/animals/Animal_type_with_Intake_Type?Animal_Type=${selectedAnimalType}`).then((response) => {
      setData(response.data);
    });
  }, [selectedAnimalType ]);


  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };
  const updateZoom = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };
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

  const handleAnimalTypeChange = (event) => {
    setSelectedAnimalType(event.target.value);
  };

  return (
    <div className='Fondo6'>
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
        <h1> <FontAwesomeIcon icon={faHandHoldingHeart} className='text-4xl' style={{color: "#ea061d",}} /></h1>
      <label htmlFor="animalType" className='rounded-lg shadow-lg   bg-white p-2 text-2xl'>Selecciona un Tipo de Animal:</label>
        <select
          id="animalType"
          onChange={handleAnimalTypeChange}
          value={selectedAnimalType}
          className='select3'
        >
          <option value='Dog'>Perro</option>
          <option value='Cat'>Gato</option>
          <option value='Livestock'>Ganaderos</option>
          <option value='Bird'>Pajaros</option>
          <option value='Other'>Otro</option>
   
        </select>
     
        <h1 className=' rounded-lg shadow-lg  bg-white p-2 text-2xl' >Tipo de Grafico:</h1>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title3' >
        <button onClick={handleChartTypeBar}><FontAwesomeIcon  className='text-6xl' icon={faChartColumn} style={{color: "#135ddd",}}shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='rounded-full
  
  shadow-lg border-2 border-red-200 shadow-red-500/50 p-10 bg-white mx-10 mb-8' >
        <button onClick={handleChartTypePie}><FontAwesomeIcon className='text-6xl text-yellow-500' icon={faChartPie}  shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='rounded-full
  
  shadow-lg border-2 border-red-200 shadow-red-500/50 p-10 bg-white mx-10 mb-8' >
       <button onClick={handleChartTypeRadar}><FontAwesomeIcon className='text-6xl text-green-500'  icon={faSatelliteDish} shake /></button>
        </motion.div>
      
      </div>
      <div className='contenedor_grafica3'>
      <h2 className='titulo3'>Tipos de animales por Situacion</h2>
          {selectedChartType === 'bar' ? (
            <div>
              <label htmlFor='zoomLevel' className='titulo3'> Limite : </label>
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
        {selectedChartType === 'bar' ? (
          <Bar data={{ 
            labels: data.map((item) => item.Intake_Type), 
          datasets: [
            {
              label: 'Cantidad de animales',
              data: data.map((item) => item.count),
              backgroundColor : getRandomColors(data.length),
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
        ) : selectedChartType === 'pie' ? (
          <Pie data={{labels: data.map((item) => item.Intake_Type),
          datasets: [
            {
              data: data.map((item) => item.count),
              backgroundColor : getRandomColors(data.length),
            },
          ],}} />
        ) :  (
          <Radar data={{ labels: data.map((item) => item.Intake_Type), 
          datasets: [
            {
              label: 'Cantidad de animales',
              data: data.map((item) => item.count),
              backgroundColor : getRandomColors(data.length),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],}} />
          
        ) }

      </div>
    </div>
    </div>
  );
}

export default Situacion;
