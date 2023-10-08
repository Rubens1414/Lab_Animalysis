import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Radar } from 'react-chartjs-2';

function Condicion_Admision() {
  const [data, setData] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('pie'); // Inicialmente, se establece en 'pie'

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAnimalType) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/animals/Animal_type_with_Intake_Condition?Animal_Type=${selectedAnimalType}`);
          setData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedAnimalType]);

  return (
    <div className='Fondo2'>
      <div className='contenedor_botones'>
        <select
          id='animalType'
          className='select'
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
        <button onClick={() => setChartType('pie')}>Gráfico de Pastel</button>
        <button onClick={() => setChartType('radar')}>Gráfico Radar</button>
      </div>

      {loading ? (
        <div className='contenedor_grafica'>
          <p>Cargando datos...</p>
        </div>
      ) : data.length > 0 ? (
        <div className='contenedor_grafica'>
          <h2>Condiciones:</h2>
          {chartType === 'pie' ? (
            <Pie
              data={{
                labels: data.map((item) => item.Intake_Condition),
                datasets: [{ label: 'Cantidad', data: data.map((item) => item.count) }],
              }}
              width={600}
              height={200}
            />
          ) : chartType === 'radar' ? (
            <Radar
            data={{
              labels: data.map((item) => item.Intake_Condition),
              datasets: [{ label: 'Cantidad', data: data.map((item) => item.count) }],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,     // Establecer el valor mínimo del eje Y
                  max: 10,   // Establecer el valor máximo del eje Y
                },
              },
            }}
            width={600}
            height={200}
          />
          ) : null}
        </div>
      ) : (
        <div className='contenedor_grafica'>
          <p className='no-datos'>No se encontraron datos para el tipo de animal seleccionado.</p>
        </div>
      )}
    </div>
  );
}

export default Condicion_Admision;
