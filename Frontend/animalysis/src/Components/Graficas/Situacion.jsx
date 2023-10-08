import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Radar } from 'react-chartjs-2';

function Situacion() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('bar'); // Valor predeterminado: gráfico de barras

  useEffect(() => {
    // Hacer una solicitud Axios para obtener los datos necesarios desde tu servidor
    axios.get(`/api/animals/Animal_type_with_Intake_Type?Animal_Type=${selectedAnimalType}`).then((response) => {
      setData(response.data);
    });
  }, [selectedAnimalType]);

  // Función para manejar el cambio en el tipo de gráfica seleccionado
  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  // Configuración de la gráfica de barras
  const barChartData = {
    labels: data.map((item) => item.Intake_Type), // Eje x: Intake_Type
    datasets: [
      {
        label: 'Cantidad de animales',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Configuración de la gráfica de pastel
  const pieChartData = {
    labels: data.map((item) => item.Intake_Type), // Eje x: Intake_Type
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          // Agregar más colores si es necesario
        ],
      },
    ],
  };

  // Configuración de la gráfica radar
  const radarChartData = {
    labels: data.map((item) => item.Intake_Type), // Eje x: Intake_Type
    datasets: [
      {
        label: 'Cantidad de animales',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Función para manejar el cambio en el tipo de animal seleccionado
  const handleAnimalTypeChange = (event) => {
    setSelectedAnimalType(event.target.value);
  };

  return (
    <div>
      <h1>Gráficos de Situación de Animales</h1>
      <div>
        <label htmlFor="animalType">Selecciona un Tipo de Animal:</label>
        <select
          id="animalType"
          onChange={handleAnimalTypeChange}
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
        <label htmlFor="chartType">Selecciona el Tipo de Gráfica:</label>
        <select
          id="chartType"
          onChange={handleChartTypeChange}
          value={selectedChartType}
        >
          <option value="bar">Gráfico de Barras</option>
          <option value="pie">Gráfico de Pastel</option>
          <option value="radar">Gráfico Radar</option>
        </select>
      </div>
      <div>
        {selectedChartType === 'bar' && <Bar data={barChartData} />}
        {selectedChartType === 'pie' && <Pie data={pieChartData} />}
        {selectedChartType === 'radar' && <Radar data={radarChartData} />}
      </div>
    </div>
  );
}

export default Situacion;
