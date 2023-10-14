const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./conexion');
const fs = require('fs');
const csv = require('csv-parser');
const Animals = require('./models/Animal'); // Importa el modelo de Animal

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const animalsRoutes = require('./Rutas/animals'); // Asegúrate de que la ruta sea correcta

app.use('/api/animals', animalsRoutes); // Monta las rutas de Animals en "/api/animals"

// Ruta al archivo CSV
const csvFilePath = './csv/Austin_Animal_Center_Intakes_clean.csv'; 

Animals.findOne({}).exec()
  .then((result) => {
    if (!result) {
      // Si no existen registros, realiza la importación del CSV
      // Leer el archivo CSV y procesar cada fila
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          // Crea una instancia del modelo Animals con los datos del CSV
          const animal = new Animals({
            Animal_ID: row.Animal_ID,
            Name: row.Name,
            DateTime: row.DateTime,
            Found_Location: row.Found_Location,
            Intake_Type: row.Intake_Type,
            Intake_Condition: row.Intake_Condition,
            Animal_Type: row.Animal_Type,
            Sex_upon_Intake: row.Sex_upon_Intake,
            Age_upon_Intake: row.Age_upon_Intake,
            Breed: row.Breed,
            Color: row.Color,
          });

          // Guarda el documento en la base de datos
          animal.save()
            .then(() => {
              console.log('Espere a que se importen todos los registros...');
            })
            .catch((error) => {
              console.error('Error al guardar el documento:', error);
            });
        })
        .on('end', () => {
          console.log('Proceso de importación completado');
        });
    } else {
      console.log('Ya no hay registros pendientes, Csv importado.');
    }
  })
  .catch((error) => {
    console.error('Error al verificar si existen registros:', error);
  });

app.get('/', function (req, res) {
  res.send('Server online');
});


app.listen(5000, function () {
  console.log('Server online en el puerto 5000');
});
