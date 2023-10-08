import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function Raza() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');

  useEffect(() => {
    // Hacer una solicitud Axios para obtener los datos necesarios desde tu servidor
    axios.get(`/api/animals/Animal_type_with_Breed?Animal_Type=${selectedAnimalType}`).then((response) => {
      setData(response.data);
    });
  }, [selectedAnimalType]);

  // Filtrar y obtener solo las razas más comunes (por ejemplo, las 5 razas más comunes)
  const topBreeds = data
    .sort((a, b) => b.count - a.count) // Ordenar por recuento descendente
    .slice(0, 5); // Obtener las primeras 5 razas más comunes (ajusta según tus necesidades)

  // Configuración de la gráfica de pastel
  const pieChartData = {
    labels: topBreeds.map((item) => item.Breed), // Etiquetas para las razas más comunes
    datasets: [
      {
        data: topBreeds.map((item) => item.count), // Datos de recuento para las razas más comunes
        backgroundColor: getRandomColors(topBreeds.length), // Colores aleatorios para cada segmento
      },
    ],
  };

  // Función para obtener colores aleatorios para los segmentos del gráfico de pastel
  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }

  // Función para manejar el cambio en el tipo de animal seleccionado
  const handleAnimalTypeChange = (event) => {
    setSelectedAnimalType(event.target.value);
  };

  return (
    <div>
      <h1>Gráfico de Razas más Comunes por Tipo de Animal</h1>
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
        <Pie data={pieChartData} />
      </div>
    </div>
  );
}

export default Raza;
