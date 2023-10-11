import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { faCow } from '@fortawesome/free-solid-svg-icons';

import '../../Styles/Tipos_Animales.css';

function Tipos_Animales() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [chart, setChart] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(11000); // Estado para el nivel de zoom
  const chartRef = useRef(null);

  const updateZoom = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear) {
        setLoading(true);
        try {
          const response = await axios.get('/api/animals/Animal_type_with_datetime');
          const filteredData = response.data.filter(
            (item) => item.Year.toString() === selectedYear
          );

          setData(filteredData);

          if (chart) {
            chart.destroy();
          }

          const newChart = new Chart(chartRef.current, {
            type: chartType,
            data: {
              labels: filteredData.map((item) => item.Animal_Type),
              datasets: [{ label: 'Cantidad', data: filteredData.map((item) => item.count) }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  max: zoomLevel, // Ajusta la escala Y en función del zoom
                },
              },
            },
          });

          setChart(newChart);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedYear, chartType]);

  const toggleChartbar = () => {
    setChartType('bar');
  };

  const toggleChartpie = () => {
      setChartType('pie');
    };
  
    function getRandomColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        colors.push(color);
      }
      return colors;
    }
  

  return (
    <div className='Fondo2'>

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


     <div className='contenedor_principal'>

    
      <div className='contenedor_botones'>
      <h1 className='  text-2xl p-2' >
      <FontAwesomeIcon className='text-4xl  text-amber-900' icon={faCat}/>
            <FontAwesomeIcon className='text-4xl text-amber-900' icon={faDog}  />
            <FontAwesomeIcon  className='text-4xl text-amber-900' icon={faCrow} />
            <FontAwesomeIcon   className='text-4xl text-amber-900 ' icon={faCow}  /></h1>
      <h1 className=' rounded-lg shadow-lg border-2 border-blue-200 shadow-blue-500/50  bg-white text-2xl p-2' >Seleccione el año:</h1>
      <select
          id='year' className='select'
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value=''>Seleccionar el Año</option>
          <option value='2014'>2014</option>
          <option value='2015'>2015</option>
          <option value='2016'>2016</option>
          <option value='2017'>2017</option>
          <option value='2018'>2018</option>
          <option value='2019'>2019</option>
          <option value='2020'>2020</option>
          <option value='2021'>2021</option>
        </select>
        <h1 className=' rounded-lg shadow-lg border-2 border-purple-200 shadow-purple-500/50  bg-white p-2 text-2xl' >Tipo de grafico:</h1>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title3' >
           <button onClick={toggleChartpie}><FontAwesomeIcon className='text-6xl' icon={faChartPie} style={{color: "#dd3cc7",}} shake /></button>
        </motion.div>
        <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}className='title3' >
        <button onClick={toggleChartbar}><FontAwesomeIcon  className='text-6xl' icon={faChartColumn} style={{color: "#135ddd",}}shake /></button>
        </motion.div>
       


      </div>

      {loading ? (
        <div className='contenedor_grafica'>
          <p >Cargando datos...</p>
        </div>
      ) : data.length > 0 ? (
        <div className='contenedor_grafica'>
          
            <h2 className='titulo2'> Tipos de animales ingresados en el Año: {selectedYear}</h2>
            {chartType === 'bar' ? (
                <div>
                    <label htmlFor='zoomLevel' className='titulo2'> Limite : </label>
                    <input  className='titulo2 textField'
                      type='number'
                      id='zoomLevel'
                      value={zoomLevel}
                      onChange={(e) => updateZoom(Number(e.target.value))}
                    />
        
               </div>
            ) : (
              <h3 className='titulo2'> Gráfico de Torta </h3>
            )}
        
          {chartType === 'bar' ? (
            
            <Bar
              data={{
                labels: data.map((item) => item.Animal_Type),
                datasets: [{ label: 'Cantidad', data: data.map((item) => item.count), 
                backgroundColor: getRandomColors(data.length)}],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: zoomLevel, // Ajusta la escala Y en función del zoom
                  },
                },
              }}
              width={900}
              height={500}
            />
          ) : (
            <Pie
              data={{
                labels: data.map((item) => item.Animal_Type),
                datasets: [{ label: 'Cantidad', data: data.map((item) => item.count) }],
                backgroundColor: getRandomColors(data.length)
              }}
              width={400}
              height={200}
            />
          )}
        </div>
      ) : (
        <div className='contenedor_grafica'>
          <p className='no-datos'>No se encontraron datos para el año seleccionado.</p>
        </div>
      )}

</div>
      </div>
   
  );
}

export default Tipos_Animales;
