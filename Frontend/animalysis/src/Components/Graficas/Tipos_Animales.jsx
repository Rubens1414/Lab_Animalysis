import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
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

  const toggleChartType = () => {
    setChartType(chartType === 'bar' ? 'pie' : 'bar');
  };


  return (
    <div className='Fondo2'>
      <div className='contenedor_botones'>

       <button className='title3'onClick={toggleChartType}>Cambiar Tipo de Gráfico</button>

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
                datasets: [{ label: 'Cantidad', data: data.map((item) => item.count), backgroundColor: [
                'rgba(255, 99, 132, 0.6)',   // Color de la primera barra
                'rgba(54, 162, 235, 0.6)',  // Color de la segunda barra
                'rgba(255, 206, 86, 0.6)',  // Color de la tercera barra
                // Agrega más colores aquí según sea necesario
            ] }],
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
  );
}

export default Tipos_Animales;
