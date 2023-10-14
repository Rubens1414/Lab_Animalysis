import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import '../../Styles/colores.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';



function Colores() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [minimo, setMinimo] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(8000); 

  useEffect(() => {
   
    axios.get(`/api/animals/Animal_type_with_Color?Animal_Type=${selectedAnimalType}`).then((response) => {
 
      setData(response.data);
    });
  }, [selectedAnimalType]);

  const topcolor = data
    .sort((a, b) => b.count - a.count)
    .slice(0, minimo); // 
  const updateZoom = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };
  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }
  const updateMinimo = (newMinimo) => {
    setMinimo(newMinimo);
  };


  const handleChartTypeBar = (event) => {

    setSelectedChartType('bar');
  }
  const handleChartTypePie = (event) => {
      
      setSelectedChartType('pie');
    }

  return (
    <div className='Fondo7'>
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
     <div className='contenedor_principal5'>
      <div className='contenedor_botones5'>
      <h1> <FontAwesomeIcon icon={faDroplet}  className='text-4xl' style={{color: "#f5ac0f",}} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ff0000" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#00ff00" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#0000ff" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ffff00" }} />
            <FontAwesomeIcon icon={faDroplet}  className='text-4xl'style={{ color: "#ff00ff" }} /></h1>
      <label htmlFor="animalType" className='rounded-lg shadow-lg   bg-white p-2 text-2xl'>Selecciona un Tipo de Animal:</label>
        <select
          id="animalType"
          onChange={(e) => setSelectedAnimalType(e.target.value)}
          value={selectedAnimalType} 
          className='select5'
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
      </div>
      <div className='contenedor_grafica5'>
      <h2 className='titulo4'>Tipos de animales por Colores</h2>

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
            <div>
            <label htmlFor='filter' className='titulo3'> Minimo : </label>
            <input className='titulo5 textField3'
                type='number'
                id='minimum'
                value={minimo}
                onChange={(e) => updateMinimo(Number(e.target.value))}
              />
       
            </div>
         
        {selectedChartType === 'bar' ? (
             <Bar data={{ labels: topcolor.map((item) => item.Color),
              datasets: [
                {
                  label: 'Cantidad',
                  data: topcolor.map((item) => item.count),
                  backgroundColor: getRandomColors(topcolor.length),
                },
              ],}} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: zoomLevel, // Ajusta la escala Y en función del zoom
                  },
                },
              }}
              />
        ) : (
          <Pie data={{ labels: topcolor.map((item) => item.Color),
            datasets: [
              {
                data: topcolor.map((item) => item.count),
                backgroundColor: getRandomColors(data.length),
              },
            ],}} />
        )}
      </div>
    </div>
    </div>
  );
}

export default Colores;
