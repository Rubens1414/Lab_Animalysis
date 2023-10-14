const express = require('express');
const router = express.Router();

const Animal = require('../models/Animal'); 




  router.get('/Animal_type_with_datetime', async (req, res) => {
    try {
      const animals = await Animal.find(); // Obtener todos los documentos de la colección Animal
  
      // Crear un objeto para mantener un seguimiento de las cuentas por año y tipo de animal
      const countsByYearAndAnimal = {};
  
      // Iterar sobre los documentos y realizar la conversión y conteo
      animals.forEach((animal) => {
        if (animal.DateTime) {
          const dateTimeParts = animal.DateTime.split('/');
          if (dateTimeParts.length === 3) {
            const year = parseInt(`20${dateTimeParts[2]}`, 10); // se supone que 'AA' significa los dos últimos dígitos del año
            const animalType = animal.Animal_Type;
  
            // Crear una clave única para cada combinación de año y tipo de animal
            const key = `${year}_${animalType}`;
  
            // Incrementar el recuento para esa clave
            countsByYearAndAnimal[key] = (countsByYearAndAnimal[key] || 0) + 1;
          }
        }
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByYearAndAnimal).map((key) => {
        const [year, animalType] = key.split('_');
        return {
          Year: parseInt(year, 10),
          Animal_Type: animalType,
          count: countsByYearAndAnimal[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
  router.get('/Animal_type_with_Intake_Condition', async (req, res) => {
    try {
      const { Animal_Type, Intake_Condition } = req.query; // Obtener los parámetros de consulta
  
      const filter = {}; // Objeto de filtro vacío al principio
  
      if (Animal_Type) {
        // Si se proporciona Animal_Type en la consulta, agregarlo al filtro
        filter.Animal_Type = Animal_Type;
      }
  
      if (Intake_Condition) {
        // Si se proporciona Intake_Condition en la consulta, agregarlo al filtro
        filter.Intake_Condition = Intake_Condition;
      }
  
      const animals = await Animal.find(filter); // Obtener los documentos que coinciden con el filtro
  
      // Crear un objeto para mantener un seguimiento de las cuentas por Animal_Type e Intake_Condition
      const countsByAnimalTypeAndIntakeCondition = {};
  
      // Iterar sobre los documentos y realizar el conteo
      animals.forEach((animal) => {
        const animalType = animal.Animal_Type;
        const intakeCondition = animal.Intake_Condition;
  
        // Crear una clave única para cada combinación de Animal_Type e Intake_Condition
        const key = `${animalType}_${intakeCondition}`;
  
        // Incrementar el recuento para esa clave
        countsByAnimalTypeAndIntakeCondition[key] = (countsByAnimalTypeAndIntakeCondition[key] || 0) + 1;
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByAnimalTypeAndIntakeCondition).map((key) => {
        const [animalType, intakeCondition] = key.split('_');
        return {
          Animal_Type: animalType,
          Intake_Condition: intakeCondition,
          count: countsByAnimalTypeAndIntakeCondition[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
 
  router.get('/Animal_type_with_Age_upon_Intake', async (req, res) => {
    try {
      const { Animal_Type } = req.query; // Obtener el parámetro de consulta Animal_Type
  
      const filter = {}; // Objeto de filtro vacío al principio
  
      if (Animal_Type) {
        // Si se proporciona Animal_Type en la consulta, agregarlo al filtro
        filter.Animal_Type = Animal_Type;
      }
  
      const animals = await Animal.find(filter); // Obtener los documentos que coinciden con el filtro
  
      // Crear un objeto para mantener un seguimiento de las cuentas por Animal_Type y Age_upon_Intake
      const countsByAnimalTypeAndAgeUponIntake = {};
  
      // Iterar sobre los documentos y realizar el conteo
      animals.forEach((animal) => {
        const animalType = animal.Animal_Type;
        const ageUponIntake = animal.Age_upon_Intake;
  
        // Crear una clave única para cada combinación de Animal_Type y Age_upon_Intake
        const key = `${animalType}_${ageUponIntake}`;
  
        // Incrementar el recuento para esa clave
        countsByAnimalTypeAndAgeUponIntake[key] = (countsByAnimalTypeAndAgeUponIntake[key] || 0) + 1;
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByAnimalTypeAndAgeUponIntake).map((key) => {
        const [animalType, ageUponIntake] = key.split('_');
        return {
          Animal_Type: animalType,
          Age_upon_Intake: ageUponIntake,
          count: countsByAnimalTypeAndAgeUponIntake[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
  router.get('/Animal_type_with_Breed', async (req, res) => {
    try {
      const { Animal_Type } = req.query; // Obtener el parámetro de consulta Animal_Type
  
      const filter = {}; // Objeto de filtro vacío al principio
  
      if (Animal_Type) {
        // Si se proporciona Animal_Type en la consulta, agregarlo al filtro
        filter.Animal_Type = Animal_Type;
      }
  
      const animals = await Animal.find(filter); // Obtener los documentos que coinciden con el filtro
  
      // Crear un objeto para mantener un seguimiento de las cuentas por Animal_Type y Breed
      const countsByAnimalTypeAndBreed = {};
  
      // Iterar sobre los documentos y realizar el conteo
      animals.forEach((animal) => {
        const animalType = animal.Animal_Type;
        const breed = animal.Breed;
  
        // Crear una clave única para cada combinación de Animal_Type y Breed
        const key = `${animalType}_${breed}`;
  
        // Incrementar el recuento para esa clave
        countsByAnimalTypeAndBreed[key] = (countsByAnimalTypeAndBreed[key] || 0) + 1;
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByAnimalTypeAndBreed).map((key) => {
        const [animalType, breed] = key.split('_');
        return {
          Animal_Type: animalType,
          Breed: breed,
          count: countsByAnimalTypeAndBreed[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
  router.get('/Animal_type_with_Color', async (req, res) => {
    try {
      const { Animal_Type } = req.query; // Obtener el parámetro de consulta Animal_Type
  
      const filter = {}; // Objeto de filtro vacío al principio
  
      if (Animal_Type) {
        // Si se proporciona Animal_Type en la consulta, agregarlo al filtro
        filter.Animal_Type = Animal_Type;
      }
  
      const animals = await Animal.find(filter); // Obtener los documentos que coinciden con el filtro
  
      // Crear un objeto para mantener un seguimiento de las cuentas por Animal_Type y Color
      const countsByAnimalTypeAndColor = {};
  
      // Iterar sobre los documentos y realizar el conteo
      animals.forEach((animal) => {
        const animalType = animal.Animal_Type;
        const color = animal.Color;
  
        // Crear una clave única para cada combinación de Animal_Type y Color
        const key = `${animalType}_${color}`;
  
        // Incrementar el recuento para esa clave
        countsByAnimalTypeAndColor[key] = (countsByAnimalTypeAndColor[key] || 0) + 1;
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByAnimalTypeAndColor).map((key) => {
        const [animalType, color] = key.split('_');
        return {
          Animal_Type: animalType,
          Color: color,
          count: countsByAnimalTypeAndColor[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
  
  router.get('/Animal_type_with_Intake_Type', async (req, res) => {
    try {
      const { Animal_Type } = req.query; // Obtener el parámetro de consulta Animal_Type
  
      const filter = {}; // Objeto de filtro vacío al principio
  
      if (Animal_Type) {
        // Si se proporciona Animal_Type en la consulta, agregarlo al filtro
        filter.Animal_Type = Animal_Type;
      }
  
      const animals = await Animal.find(filter); // Obtener los documentos que coinciden con el filtro
  
      // Crear un objeto para mantener un seguimiento de las cuentas por Animal_Type e Intake_Type
      const countsByAnimalTypeAndIntakeType = {};
  
      // Iterar sobre los documentos y realizar el conteo
      animals.forEach((animal) => {
        const animalType = animal.Animal_Type;
        const intakeType = animal.Intake_Type;
  
        // Crear una clave única para cada combinación de Animal_Type e Intake_Type
        const key = `${animalType}_${intakeType}`;
  
        // Incrementar el recuento para esa clave
        countsByAnimalTypeAndIntakeType[key] = (countsByAnimalTypeAndIntakeType[key] || 0) + 1;
      });
  
      // Convertir el objeto en un array de resultados
      const results = Object.keys(countsByAnimalTypeAndIntakeType).map((key) => {
        const [animalType, intakeType] = key.split('_');
        return {
          Animal_Type: animalType,
          Intake_Type: intakeType,
          count: countsByAnimalTypeAndIntakeType[key],
        };
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de los animales');
    }
  });
module.exports = router;
