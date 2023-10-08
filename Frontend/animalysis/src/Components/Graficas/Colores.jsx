import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';

function Colores() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [filterValue, setFilterValue] = useState(200); // Valor de filtro inicial

  useEffect(() => {
    // Hacer una solicitud Axios para obtener los datos necesarios desde tu servidor
    axios.get(`/api/animals/Animal_type_with_Color?Animal_Type=${selectedAnimalType}`).then((response) => {
      // Filtrar los datos utilizando el valor de filtro ingresado por el usuario
      const filteredData = response.data.filter((item) => item.count > filterValue);
      setData(filteredData);
    });
  }, [selectedAnimalType, filterValue]);
  const handleFilterChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Asegurarse de que es un número
    setFilterValue(newValue);
  };
  // Colores personalizados para los gráficos
  const customColors = [
    '#FF5733', // Color 1
    '#33FF57', // Color 2
    '#3366FF', // Color 3
    '#FF33FF', // Color 4
    '#FFFF33', // Color 5
    '#FF6633', // Color 6
    '#33FFFF', // Color 7
    '#9966FF', // Color 8
    '#66FF66', // Color 9
    '#FF99CC', // Color 10
    
  ];

  // Configuración de datos para el gráfico de barras
  const barChartData = {
    labels: data.map((item) => item.Color),
    datasets: [
      {
        label: 'Cantidad',
        data: data.map((item) => item.count),
        backgroundColor: customColors,
      },
    ],
  };

  // Configuración de datos para el gráfico de pastel
  const pieChartData = {
    labels: data.map((item) => item.Color),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: customColors,
      },
    ],
  };

  // Función para manejar el cambio en el tipo de gráfico seleccionado
  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  return (
    <div>
     
      <div>
        <label htmlFor="animalType">Selecciona un Tipo de Animal:</label>
        <select
          id="animalType"
          onChange={(e) => setSelectedAnimalType(e.target.value)}
          value={selectedAnimalType}
        >
        
          <option value='Dog'>Perro</option>
          <option value='Cat'>Gato</option>
          <option value='Livestock'>Ganaderos</option>
          <option value='Bird'>Pajaros</option>
          <option value='Other'>Otro</option>
          {/* Agrega más opciones según tus datos */}
        </select>
      </div>
      <div>
          <label htmlFor="filterValue">Valor de Filtro:</label>
          <input
            type="number"
            id="filterValue"
            value={filterValue}
            onChange={handleFilterChange}
          />
        </div>
      <div>
        <label htmlFor="chartType">Selecciona un Tipo de Gráfico:</label>
        <select
          id="chartType"
          onChange={handleChartTypeChange}
          value={selectedChartType}
        >
          <option value="bar">Gráfico de Barras</option>
          <option value="pie">Gráfico de Pastel</option>
        </select>
      </div>
      <div>
        {selectedChartType === 'bar' ? (
            <div className='contenedor_grafica'>  <Bar data={barChartData} /></div>
        
        ) : (
          <Pie data={pieChartData} />
        )}
      </div>
    </div>
  );
}

export default Colores;
